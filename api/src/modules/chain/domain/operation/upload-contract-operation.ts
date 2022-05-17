import { AggregateRoot, UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  CreateUploadContractOperationProps,
  UploadContractOperationCreated,
  UploadContractOperationProps,
} from '.';

export class UploadContractOperation extends AggregateRoot<UploadContractOperationProps> {
  protected readonly _id: KoinosId;

  static create(
    create: CreateUploadContractOperationProps,
    id: UUID,
  ): UploadContractOperation {
    const props: UploadContractOperationProps = {
      ...create,
    };

    const operation = new UploadContractOperation({ id, props });

    operation.addEvent(
      new UploadContractOperationCreated({
        aggregateId: id.value,
        contractId: props.contractId.value,
        bytecode: props.bytecode,
        abi: props.abi,
      }),
    );

    return operation;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get bytecode(): string {
    return this.props.bytecode;
  }

  get abi(): string | undefined {
    return this.props.abi;
  }

  validate(): void {
    // TODO: Add validations
  }
}
