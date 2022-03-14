import {
  ContractStandard,
  ContractStandardType,
} from '@koiner/contracts/domain';

export abstract class ContractStandardReadRepository {
  abstract find(): Promise<ContractStandard[]>;
  abstract findOneByType(type: ContractStandardType): Promise<ContractStandard>;
}
