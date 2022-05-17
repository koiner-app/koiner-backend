import { AggregateRoot, UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  CreateSystemContractOperationProps,
  SystemContractOperationCreated,
  SystemContractOperationProps,
} from '.';

export class SystemContractOperation extends AggregateRoot<SystemContractOperationProps> {
  protected readonly _id: KoinosId;

  static create(
    create: CreateSystemContractOperationProps,
    id: UUID,
  ): SystemContractOperation {
    const props: SystemContractOperationProps = {
      ...create,
    };

    const operation = new SystemContractOperation({ id, props });

    operation.addEvent(
      new SystemContractOperationCreated({
        aggregateId: id.value,
        contractId: props.contractId.value,
        systemContract: props.systemContract,
      }),
    );

    return operation;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get systemContract(): boolean {
    return this.props.systemContract;
  }

  validate(): void {
    // TODO: Add validations
  }
}
