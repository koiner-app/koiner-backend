import { AggregateRoot, UUID } from '@appvise/domain';
import {
  SystemCallOperationProps,
  CreateSystemCallOperationProps,
} from './system-call-operation.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';

export class SystemCallOperation extends AggregateRoot<SystemCallOperationProps> {
  protected readonly _id: KoinosId;

  static create(
    create: CreateSystemCallOperationProps,
    id: UUID,
  ): SystemCallOperation {
    const props: SystemCallOperationProps = {
      ...create,
    };

    const systemCallOperation = new SystemCallOperation({ id, props });

    // systemCallOperation.apply(new SystemCallOperationCreated(id.value, props.header.signer));

    return systemCallOperation;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get callId(): number {
    return this.props.callId;
  }

  validate(): void {
    // TODO: Add validations
  }
}
