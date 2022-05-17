import { AggregateRoot, UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  CreateTokenBalanceProps,
  TokenBalanceCreated,
  TokenBalanceProps,
  TokenBalanceUpdated,
  TokensOrigin,
  UpdateTokenBalanceProps,
} from '.';

export class TokenBalance extends AggregateRoot<TokenBalanceProps> {
  protected readonly _id: KoinosAddressId;

  static create(
    create: CreateTokenBalanceProps,
    tokensOrigin: TokensOrigin,
    id: UUID,
  ): TokenBalance {
    const props: TokenBalanceProps = {
      ...create,
    };

    const tokenBalance = new TokenBalance({ id, props });

    tokenBalance.addEvent(
      new TokenBalanceCreated({
        aggregateId: id.value,
        addressId: props.addressId.value,
        contractId: props.contractId.value,
        balance: props.balance,
        tokensOrigin: tokensOrigin,
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

  update(props: UpdateTokenBalanceProps): number {
    this.props.balance += props.amountChanged;

    if (this.props.balance < 0) {
      // TODO: Add custom exception
      // throw new ConflictException('Balance cannot be lower than 0');
    }

    this.addEvent(
      new TokenBalanceUpdated({
        aggregateId: this.id.value,
        addressId: this.addressId.value,
        contractId: this.contractId.value,
        balance: this.balance,
        amountChanged: props.amountChanged,
        tokensOrigin: props.tokensOrigin,
      }),
    );

    return this.balance;
  }

  validate(): void {
    //
  }
}
