import { AggregateRoot } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  CreateTokenHolderProps,
  TokenHolderCreated,
  TokenHolderProps,
  TokenHolderUpdated,
  UpdateTokenHolderProps,
} from '.';

export class TokenHolder extends AggregateRoot<TokenHolderProps> {
  protected readonly _id!: KoinosAddressId;

  static create(
    create: CreateTokenHolderProps,
    id: KoinosAddressId
  ): TokenHolder {
    const props: TokenHolderProps = {
      ...create,
    };

    const tokenHolder = new TokenHolder({ id, props });

    tokenHolder.addEvent(
      new TokenHolderCreated({
        aggregateId: id.value,
        addressId: id.value,
        contractId: props.contractId.value,
        balance: props.balance,
      })
    );

    return tokenHolder;
  }

  get addressId(): KoinosAddressId {
    return this._id;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get balance(): number {
    return this.props.balance;
  }

  update(props: UpdateTokenHolderProps): number {
    this.props.balance += props.amountChanged;

    if (this.props.balance < 0) {
      // TODO: Add custom exception
      // throw new ConflictException('Balance cannot be lower than 0');
    }

    this.addEvent(
      new TokenHolderUpdated({
        aggregateId: this.id.value,
        addressId: this.addressId.value,
        contractId: this.contractId.value,
        balance: this.balance,
        amountChanged: props.amountChanged,
      })
    );

    return this.balance;
  }

  validate(): void {
    //
  }
}
