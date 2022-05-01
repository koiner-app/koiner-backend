import { AggregateRoot, UUID } from '@appvise/domain';
import {
  SystemContractOperationProps,
  CreateSystemContractOperationProps,
} from './system-contract-operation.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { SystemContractOperationCreated } from '@koiner/chain/domain/operation/event/system-contract-operation-created';

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
