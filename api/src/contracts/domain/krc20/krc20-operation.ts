import { AggregateRoot, UUID } from '@appvise/domain';
import {
  CreateKrc20OperationProps,
  Krc20OperationProps,
} from './krc20-operation.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  Krc20OperationCreated,
  Krc20TokensMinted,
  Krc20TokensTransferred,
} from '.';

export class Krc20Operation extends AggregateRoot<Krc20OperationProps> {
  protected readonly _id: KoinosId;

  static create(create: CreateKrc20OperationProps, id: UUID): Krc20Operation {
    const props: Krc20OperationProps = {
      ...create,
    };

    const operation = new Krc20Operation({ id, props });

    operation.addEvent(
      new Krc20OperationCreated({
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
        new Krc20TokensMinted({
          aggregateId: id.value,
          contractId: props.contractId.value,
          to: props.to.value,
          value: props.value,
        }),
      );
    }

    if (operation.name === 'transfer') {
      operation.addEvent(
        new Krc20TokensTransferred({
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
