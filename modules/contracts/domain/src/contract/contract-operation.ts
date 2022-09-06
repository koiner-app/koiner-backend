import { AggregateRoot, UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  ContractOperationCreated,
  ContractOperationProps,
  CreateContractOperationProps,
} from '.';

export class ContractOperation extends AggregateRoot<ContractOperationProps> {
  protected readonly _id!: KoinosId;

  static create(
    create: CreateContractOperationProps,
    id: UUID
  ): ContractOperation {
    const props: ContractOperationProps = {
      ...create,
    };

    const operation = new ContractOperation({ id, props });

    operation.addEvent(
      new ContractOperationCreated({
        aggregateId: id.value,
        blockHeight: props.blockHeight,
        contractId: props.contractId.value,
        transactionId: props.transactionId.value,
        entryPoint: props.entryPoint,
        args: props.args,
        contractStandardType: props.contractStandardType,
        timestamp: props.timestamp,
      })
    );

    return operation;
  }

  get blockHeight(): number {
    return this.props.blockHeight;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get transactionId(): KoinosId {
    return this.props.transactionId;
  }

  get entryPoint(): number {
    return this.props.entryPoint;
  }

  get args(): string {
    return this.props.args;
  }

  get contractStandardType(): string | undefined {
    return this.props.contractStandardType;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  validate(): void {
    // TODO: Add validations
  }
}
