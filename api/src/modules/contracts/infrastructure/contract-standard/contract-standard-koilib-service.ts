import { Injectable } from '@nestjs/common';
import { Logger } from '@appvise/domain';
import { Contract, Provider, Signer } from 'koilib';
import { Abi } from 'koilib/lib/interface';
import {
  ContractStandard,
  ContractStandardReadRepository,
  ContractStandardType,
  ContractStandardWithValues,
} from '@koiner/contracts/domain';
import { ContractStandardService } from '@koiner/contracts/application';
import { promiseWithTimeout } from '@koiner/contracts/infrastructure/utils';

/**
 * TODO: Revisit this class to see if it can be simplified
 */
@Injectable()
export class ContractStandardKoilibService extends ContractStandardService {
  constructor(
    private readonly readRepository: ContractStandardReadRepository,
    private readonly provider: Provider,
    private readonly signer: Signer,
    private readonly logger: Logger,
  ) {
    super();
  }

  async getForContract(
    contractId: string,
    contractStandardType?: ContractStandardType,
  ): Promise<ContractStandardWithValues | undefined> {
    let contractStandards;

    if (contractStandardType) {
      // Fetch specific contract standard
      const contractStandard = await this.readRepository.findOneByType(
        contractStandardType,
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
        contractId,
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
    contractId: string,
  ): Promise<Record<string, unknown> | undefined> {
    try {
      const contract = new Contract({
        id: contractId,
        abi: contractStandard.abi as Abi,
        provider: this.provider,
        signer: this.signer,
      });

      const getterValues = {};

      // Validate if all getters return a value
      for (const getter of contractStandard.getters) {
        // Handle timeouts for corrupt contracts
        try {
          const result = await promiseWithTimeout(
            contract.functions[getter](),
            10000,
          );

          // If 1 getter has no value CodingStandard is not valid
          if (!result || !result.result.value) {
            return;
          } else {
            getterValues[getter] = result.result.value;
          }
        } catch (error) {
          this.logger.error(error.message, error);
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
    contractStandardType: ContractStandardType,
    contractId: string,
    entryPoint: number,
    args: string,
  ): Promise<any> {
    const contractStandard = await this.readRepository.findOneByType(
      contractStandardType,
    );

    const contract = new Contract({
      id: contractId,
      abi: contractStandard.abi as Abi,
      provider: this.provider,
      signer: this.signer,
    });

    return await contract.decodeOperation({
      call_contract: {
        contract_id: contractId,
        entry_point: entryPoint,
        args: args as any,
      },
    });
  }
}
