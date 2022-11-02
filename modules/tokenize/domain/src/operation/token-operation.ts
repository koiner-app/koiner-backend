import { AggregateRoot, UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  CreateTokenOperationProps,
  TokenOperationProps,
  TokenOperationCreated,
} from '.';

export class TokenOperation extends AggregateRoot<TokenOperationProps> {
  protected readonly _id!: KoinosId;

  static create(create: CreateTokenOperationProps, id: UUID): TokenOperation {
    const props: TokenOperationProps = {
      ...create,
    };

    const operation = new TokenOperation({ id, props });

    operation.addEvent(
      new TokenOperationCreated({
        aggregateId: id.value,
        contractId: props.contractId.value,
        name: props.name,
        from: props.from ? props.from.value : undefined,
        to: props.to ? props.to.value : undefined,
        value: props.value,
        timestamp: props.timestamp,
      })
    );

    return operation;
  }

  get blockHeight(): number {
    return this.props.blockHeight;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get transactionId(): KoinosId {
    return this.props.transactionId;
  }

  get name(): string {
    return this.props.name;
  }

  get from(): KoinosAddressId | undefined {
    return this.props.from;
  }

  get to(): KoinosAddressId | undefined {
    return this.props.to;
  }

  get value(): number {
    return this.props.value;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  validate(): void {
    // TODO: Add validations
  }
}
