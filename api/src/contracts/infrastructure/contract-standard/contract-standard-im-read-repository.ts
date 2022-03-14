import {
  ContractStandard,
  ContractStandardReadRepository,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { ContractStandards } from '@koiner/contracts/infrastructure/contract-standard/contract-standards';
import { Injectable } from '@nestjs/common';

/**
 * In-Memory read repository for token standards
 */
@Injectable()
export class ContractStandardImReadRepository extends ContractStandardReadRepository {
  async find(): Promise<ContractStandard[]> {
    return Promise.resolve(ContractStandards);
  }

  async findOneByType(type: ContractStandardType): Promise<ContractStandard> {
    const contractStandard = ContractStandards.find(
      (contractStandard) => contractStandard.type === type,
    );

    return Promise.resolve(contractStandard);
  }
}
