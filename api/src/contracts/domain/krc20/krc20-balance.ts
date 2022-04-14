import { AggregateRoot, ConflictException, UUID } from '@appvise/domain';
import {
  CreateKrc20BalanceProps,
  Krc20BalanceProps,
  Krc20BalanceCreated,
  Krc20BalanceUpdated,
} from '.';
import { KoinosAddressId } from '@koiner/domain';

export class Krc20Balance extends AggregateRoot<Krc20BalanceProps> {
  protected readonly _id: KoinosAddressId;

  static create(create: CreateKrc20BalanceProps, id: UUID): Krc20Balance {
    const props: Krc20BalanceProps = {
      ...create,
    };

    const tokenBalance = new Krc20Balance({ id, props });

    tokenBalance.addEvent(
      new Krc20BalanceCreated({
        aggregateId: id.value,
        addressId: props.addressId.value,
        contractId: props.contractId.value,
        balance: props.balance,
      }),
    );

    return tokenBalance;
  }

  get addressId(): KoinosAddressId {
    return this.props.addressId;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get balance(): number {
    return this.props.balance;
  }

  update(amountChanged: number): number {
    this.props.balance += amountChanged;

    if (this.props.balance < 0) {
      // TODO: Add custom exception
      throw new ConflictException('Balance cannot be lower than 0');
    }

    this.addEvent(
      new Krc20BalanceUpdated({
        aggregateId: this.id.value,
        addressId: this.addressId.value,
        contractId: this.contractId.value,
        balance: this.balance,
        amountChanged: amountChanged,
      }),
    );

    return this.balance;
  }

  validate(): void {
    //
  }
}
