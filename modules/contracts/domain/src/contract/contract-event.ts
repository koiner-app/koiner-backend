import { AggregateRoot, ArgumentInvalidException, UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  CreateContractEventProps,
  ContractEventCreated,
  ContractEventParentType,
  ContractEventProps,
} from '.';
import { ContractStandardType } from '@koiner/contracts/standards';

export class ContractEvent extends AggregateRoot<ContractEventProps> {
  protected readonly _id!: KoinosId;

  static create(create: CreateContractEventProps, id?: UUID): ContractEvent {
    const props: ContractEventProps = {
      ...create,
    };

    id = id ?? UUID.generate();
    const event = new ContractEvent({ id, props });

    event.addEvent(
      new ContractEventCreated({
        aggregateId: id.value,
        blockHeight: props.blockHeight,
        parentId: props.parentId.value,
        parentType: props.parentType,
        sequence: props.sequence,
        contractId: props.contractId.value,
        contractStandardType: props.contractStandardType,
        name: props.name,
        data: props.data,
        impacted: props.impacted
          ? props.impacted.map((impactedAddress) => impactedAddress.value)
          : undefined,
        timestamp: props.timestamp,
      })
    );

    return event;
  }

  get blockHeight(): number {
    return this.props.blockHeight;
  }

  get parentId(): KoinosId {
    return this.props.parentId;
  }

  get parentType(): ContractEventParentType {
    return this.props.parentType;
  }

  get sequence(): number | undefined {
    return this.props.sequence;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get contractStandardType(): ContractStandardType | undefined {
    return this.props.contractStandardType;
  }

  get name(): string {
    return this.props.name;
  }

  get data(): string {
    return this.props.data;
  }

  get impacted(): KoinosAddressId[] | undefined {
    return this.props.impacted;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  validate(): void {
    const parentTypeKeys = Object.keys(ContractEventParentType);

    if (!parentTypeKeys.includes(this.props.parentType)) {
      throw new ArgumentInvalidException(
        'parentType is not a valid ContractEventParentType'
      );
    }
  }
}
