import { AggregateRoot, UUID } from '@appvise/domain';
import { KoinosId } from '@koiner/domain';
import {
  CreateOperationProps,
  OperationCreated,
  OperationProps,
  OperationType,
} from '.';

export class Operation extends AggregateRoot<OperationProps> {
  protected readonly _id!: KoinosId;

  static create(create: CreateOperationProps, id?: UUID): Operation {
    const props: OperationProps = {
      ...create,
    };

    id = id ?? UUID.generate();
    const operation = new Operation({ id, props });

    operation.addEvent(
      new OperationCreated({
        aggregateId: id.value,
        blockHeight: props.blockHeight,
        transactionId: props.transactionId.value,
        operationIndex: props.operationIndex,
        type: props.type,
        timestamp: props.timestamp,
      })
    );

    return operation;
  }

  get blockHeight(): number {
    return this.props.blockHeight;
  }

  get transactionId(): KoinosId {
    return this.props.transactionId;
  }

  get operationIndex(): number {
    return this.props.operationIndex;
  }

  get type(): OperationType {
    return this.props.type;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  validate(): void {
    // TODO: Add validations
  }
}
