import { AggregateRoot, UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  CreateTokenHolderProps,
  TokenHolderCreated,
  TokenHolderProps,
  TokenHolderUpdated,
  UpdateTokenHolderProps,
} from '.';

export class TokenHolder extends AggregateRoot<TokenHolderProps> {
  protected readonly _id!: UUID;

  static create(create: CreateTokenHolderProps, id: UUID): TokenHolder {
    const props: TokenHolderProps = {
      ...create,
      mintCount: create.mintCount ?? 0,
      burnCount: create.burnCount ?? 0,
      transferInCount: create.transferInCount ?? 0,
      transferOutCount: create.transferOutCount ?? 0,
    };

    const tokenHolder = new TokenHolder({ id, props });

    tokenHolder.addEvent(
      new TokenHolderCreated({
        aggregateId: id.value,
        addressId: props.addressId.value,
        contractId: props.contractId.value,
        balance: props.balance,
      })
    );

    return tokenHolder;
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

  get mintCount(): number {
    return this.props.mintCount;
  }

  get burnCount(): number {
    return this.props.burnCount;
  }

  get transferInCount(): number {
    return this.props.transferInCount;
  }

  get transferOutCount(): number {
    return this.props.transferOutCount;
  }

  update(props: UpdateTokenHolderProps): number {
    this.props.balance += props.amountChanged;

    this.props.mintCount += props.mintCount ?? 0;
    this.props.burnCount += props.burnCount ?? 0;
    this.props.transferInCount += props.transferInCount ?? 0;
    this.props.transferOutCount += props.transferOutCount ?? 0;

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
