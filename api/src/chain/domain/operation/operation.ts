import { AggregateRoot, UUID } from '@appvise/domain';
import {
  OperationProps,
  CreateOperationProps,
  OperationType,
} from './operation.types';
import { KoinosId } from '@koiner/domain';

export class Operation extends AggregateRoot<OperationProps> {
  protected readonly _id: KoinosId;

  static create(create: CreateOperationProps, id?: UUID): Operation {
    const props: OperationProps = {
      ...create,
    };

    id = id ?? UUID.generate();
    const operation = new Operation({ id, props });

    // operation.apply(new OperationCreated(id.value, props.header.signer));

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

  validate(): void {
    // TODO: Add validations
  }
}
