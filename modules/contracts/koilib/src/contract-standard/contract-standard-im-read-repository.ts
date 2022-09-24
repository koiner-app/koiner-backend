import {
  ContractStandard,
  ContractStandardReadRepository,
  ContractStandardType,
} from '@koiner/contracts/standards';
import { ContractStandards } from './contract-standards';
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
      (contractStandard) => contractStandard.type === type
    );

    if (contractStandard) {
      return Promise.resolve(contractStandard);
    } else {
      return Promise.reject('Not found');
    }
  }
}
