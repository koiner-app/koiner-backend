import { AggregateRoot, UUID } from '@appvise/domain';
import {
  CreateTokenOperationProps,
  TokenOperationProps,
} from './token-operation.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  TokenOperationCreated,
  TokenTokensMinted,
  TokenTokensTransferred,
} from '.';

export class TokenOperation extends AggregateRoot<TokenOperationProps> {
  protected readonly _id: KoinosId;

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
        to: props.to.value,
        value: props.value,
        from: props.from ? props.from.value : undefined,
      }),
    );

    if (operation.name === 'mint') {
      operation.addEvent(
        new TokenTokensMinted({
          aggregateId: id.value,
          contractId: props.contractId.value,
          to: props.to.value,
          value: props.value,
        }),
      );
    }

    if (operation.name === 'transfer') {
      operation.addEvent(
        new TokenTokensTransferred({
          aggregateId: id.value,
          contractId: props.contractId.value,
          to: props.to.value,
          value: props.value,
        }),
      );
    }

    return operation;
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

  get to(): KoinosAddressId {
    return this.props.to;
  }

  get value(): number {
    return this.props.value;
  }

  validate(): void {
    // TODO: Add validations
  }
}
