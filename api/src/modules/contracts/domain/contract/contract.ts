import { AggregateRoot } from '@appvise/domain';
import { ContractCreated } from './event/contract-created';
import { ContractProps, CreateContractProps } from './contract.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';

export class Contract extends AggregateRoot<ContractProps> {
  protected readonly _id: KoinosId;

  static create(create: CreateContractProps, id: KoinosAddressId): Contract {
    const props: ContractProps = {
      ...create,
    };

    const contract = new Contract({ id, props });

    contract.addEvent(
      new ContractCreated({
        aggregateId: id.value,
        blockHeight: props.blockHeight,
        transactionId: props.transactionId.value,
        operationIndex: props.operationIndex,
        contractStandardType: props.contractStandardType,
      }),
    );

    return contract;
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

  get bytecode(): string {
    return this.props.bytecode;
  }

  get abi(): string {
    return this.props.abi;
  }

  get contractStandardType(): string | undefined {
    return this.props.contractStandardType;
  }

  validate(): void {
    // TODO: Add validations
  }
}
