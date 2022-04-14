import { SelectionSet, WriteRepository } from '@appvise/domain';
import { Krc20Balance } from '@koiner/contracts/domain';

export abstract class Krc20BalanceWriteRepository extends WriteRepository<Krc20Balance> {
  abstract findOne(
    addressId: string,
    contractId: string,
    selectionSet?: SelectionSet,
  ): Promise<Krc20Balance | undefined>;
}
