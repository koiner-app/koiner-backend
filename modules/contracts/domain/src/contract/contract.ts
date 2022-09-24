import { AggregateRoot } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { ContractCreated, ContractProps, CreateContractProps } from '.';
import { ContractStandardType } from '@koiner/contracts/standards';

export class Contract extends AggregateRoot<ContractProps> {
  protected readonly _id!: KoinosId;

  static create(create: CreateContractProps, id: KoinosAddressId): Contract {
    const props: ContractProps = {
      ...create,
    };

    const contract = new Contract({ id, props });

    contract.addEvent(
      new ContractCreated({
        aggregateId: id.value,
        contractStandardType: props.contractStandardType,
        timestamp: props.timestamp,
      })
    );

    return contract;
  }

  get bytecode(): string {
    return this.props.bytecode;
  }

  get abi(): string | undefined {
    return this.props.abi;
  }

  get contractStandardType(): ContractStandardType | undefined {
    return this.props.contractStandardType;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  validate(): void {
    // TODO: Add validations
  }
}
