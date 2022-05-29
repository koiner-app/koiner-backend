import { ContractStandard, ContractStandardType } from '..';

export abstract class ContractStandardReadRepository {
  abstract find(): Promise<ContractStandard[]>;
  abstract findOneByType(type: ContractStandardType): Promise<ContractStandard>;
}
