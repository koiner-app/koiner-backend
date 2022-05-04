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
        contractStandardType: props.contractStandardType,
      }),
    );

    return contract;
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
