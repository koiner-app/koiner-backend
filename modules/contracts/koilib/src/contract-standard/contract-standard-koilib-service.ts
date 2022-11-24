import { Injectable } from '@nestjs/common';
import { Logger } from '@appvise/domain';
import { Contract, Provider, Signer } from 'koilib';
import { Abi } from 'koilib/lib/interface';
import {
  ContractStandard,
  ContractStandardReadRepository,
  ContractStandardService,
  ContractStandardType,
  ContractStandardWithValues,
} from '@koiner/contracts/standards';
import { promiseWithTimeout } from '../utils';
import { ContractQuery } from '@koiner/contracts/application';
import { Contract as KoinerContract } from '@koiner/contracts/domain';
import { QueryBus } from '@nestjs/cqrs';
import {
  decodeArgs,
  fetchContractMeta,
  findEntryPoint,
  findEntryPointByTypes,
  potentialTypes,
} from './decoding-utils';

/**
 * TODO: Revisit this class to see if it can be simplified
 */
@Injectable()
export class ContractStandardKoilibService extends ContractStandardService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly readRepository: ContractStandardReadRepository,
    private readonly provider: Provider,
    private readonly signer: Signer,
    private readonly logger: Logger
  ) {
    super();
  }

  async getForContract(
    contractId: string,
    contractStandardType?: ContractStandardType
  ): Promise<ContractStandardWithValues | undefined> {
    let contractStandards;

    if (contractStandardType) {
      // Fetch specific contract standard
      const contractStandard = await this.readRepository.findOneByType(
        contractStandardType
      );

      contractStandards = [contractStandard];
    } else {
      // Loop through all contract standards
      contractStandards = await this.readRepository.find();
    }

    for (const contractStandard of contractStandards) {
      // Check all coding standards if it matches current contract
      const contractValues = await this.getContractValues(
        contractStandard,
        contractId
      );

      if (contractValues) {
        return {
          contractStandard,
          contractValues,
        };
      }
    }

    return undefined;
  }

  async getContractValues(
    contractStandard: ContractStandard,
    contractId: string
  ): Promise<Record<string, unknown> | undefined> {
    try {
      const contract = new Contract({
        id: contractId,
        abi: contractStandard.abi as Abi,
        provider: this.provider,
        signer: this.signer,
      });

      const getterValues: any = {};

      // Validate if all getters return a value
      for (const getter of contractStandard.getters) {
        // Handle timeouts for corrupt contracts
        try {
          const result = await promiseWithTimeout(
            contract.functions[getter](),
            10000
          );

          // If 1 getter has no value CodingStandard is not valid
          if (!result || !result.result.value) {
            return;
          } else {
            getterValues[getter] = result.result.value;
          }
        } catch (error: any) {
          this.logger.debug(
            `ContractStandardKoilibService.getContractValues error: ${error.message}`,
            error
          );
          // No match
          return;
        }
      }

      // We have a match
      return getterValues;
    } catch (error) {
      // Ignore if failed
      return;
    }
  }

  async decodeOperation(
    contractId: string,
    entryPoint: number,
    args: string,
    contractStandardType?: ContractStandardType
  ): Promise<{ name: string; data?: any }> {
    // Use koilib for known token standard (token)
    if (contractStandardType) {
      const contractStandard = await this.readRepository.findOneByType(
        contractStandardType
      );

      const abi = contractStandard.abi as Abi;
      const contract = new Contract({
        id: contractId,
        abi,
        provider: this.provider,
        signer: this.signer,
      });

      const data = await contract.decodeOperation({
        call_contract: {
          contract_id: contractId,
          entry_point: entryPoint,
          args: args as any,
        },
      });

      return {
        name: data.name,
        data: data.args,
      };
    }

    // Otherwise decode using contract abi
    return this.decodeOperationWithProto(contractId, entryPoint, args);
  }

  async decodeOperationWithProto(
    contractId: string,
    entryPoint: number,
    args: string
  ): Promise<{ name: string; data?: any }> {
    const contract = await this.queryBus.execute<ContractQuery, KoinerContract>(
      new ContractQuery(contractId)
    );

    if (contract && contract.abi) {
      try {
        const meta = await fetchContractMeta(contract.abi);

        if (!meta.root || !meta.abi) {
          this.logger.error('Could not decode args. No root or abi');

          return {
            name: 'unknown',
          };
        }

        const abi = meta.abi;
        const method = findEntryPoint(entryPoint, abi);
        const decoded = decodeArgs(entryPoint, args, abi, meta.root);

        return {
          name: method ?? 'unknown',
          data: decoded,
        };
      } catch (e) {
        this.logger.error('Could not decode args', e);
      }
    }

    return {
      name: 'unknown',
    };
  }

  async decodeEvent(
    contractId: string,
    name: string,
    args: string
  ): Promise<{ name: string; entryPoint?: number; data?: any }> {
    const potentialTypes1 = potentialTypes(name);

    const contract = await this.queryBus.execute<ContractQuery, KoinerContract>(
      new ContractQuery(contractId)
    );

    if (contract && contract.abi) {
      try {
        const meta = await fetchContractMeta(contract.abi);

        if (!meta.root || !meta.abi) {
          this.logger.error('Could not decode args. No root or abi');

          return {
            name: 'unknown',
          };
        }

        const abi = meta.abi;
        const entryPoint = findEntryPointByTypes(potentialTypes1, abi);
        const decoded = decodeArgs(entryPoint, args, abi, meta.root);

        return {
          name,
          entryPoint,
          data: decoded,
        };
      } catch (e) {
        this.logger.error('Could not decode args', e);
      }
    }

    return {
      name: 'unknown',
    };
  }
}
