import { AggregateRoot, UUID } from '@appvise/domain';
import {
  SystemContractOperationProps,
  CreateSystemContractOperationProps,
} from './system-contract-operation.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';

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

    // operation.apply(new OperationCreated(id.value, props.header.signer));

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
