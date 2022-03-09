import { AggregateRoot, UUID } from '@appvise/domain';
import {
  UploadContractOperationProps,
  CreateUploadContractOperationProps,
} from './upload-contract-operation.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';

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

    // operation.apply(new OperationCreated(id.value, props.header.signer));

    return operation;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get bytecode(): string {
    return this.props.bytecode;
  }

  get abi(): string {
    return this.props.abi;
  }

  validate(): void {
    // TODO: Add validations
  }
}
