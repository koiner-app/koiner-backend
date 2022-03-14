import { AggregateRoot, UUID } from '@appvise/domain';
import {
  ContractOperationProps,
  CreateContractOperationProps,
} from './contract-operation.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { ContractOperationCreated } from '@koiner/chain/domain';

export class ContractOperation extends AggregateRoot<ContractOperationProps> {
  protected readonly _id: KoinosId;

  static create(
    create: CreateContractOperationProps,
    id: UUID,
  ): ContractOperation {
    const props: ContractOperationProps = {
      ...create,
    };

    const operation = new ContractOperation({ id, props });

    operation.apply(
      new ContractOperationCreated(
        id.value,
        props.contractId.value,
        props.entryPoint,
        props.args,
        props.contractStandardType,
      ),
    );

    return operation;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
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

  validate(): void {
    // TODO: Add validations
  }
}
