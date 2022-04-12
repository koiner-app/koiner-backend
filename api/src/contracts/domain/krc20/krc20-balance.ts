import { AggregateRoot } from '@appvise/domain';
import {
  CreateKrc20BalanceProps,
  Krc20BalanceProps,
  Krc20BalanceCreated,
  Krc20BalanceUpdated,
} from '.';
import { KoinosAddressId } from '@koiner/domain';
import { UUID } from '@appvise/domain/dist/types';

export class Krc20Balance extends AggregateRoot<Krc20BalanceProps> {
  protected readonly _id: KoinosAddressId;

  static create(create: CreateKrc20BalanceProps, id: UUID): Krc20Balance {
    const props: Krc20BalanceProps = {
      ...create,
    };

    const tokenBalance = new Krc20Balance({ id, props });

    tokenBalance.apply(new Krc20BalanceCreated(id.value, props.balance));

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

    this.apply(
      new Krc20BalanceUpdated(this.id.value, this.balance, amountChanged),
    );

    return this.balance;
  }

  validate(): void {
    //
  }
}
