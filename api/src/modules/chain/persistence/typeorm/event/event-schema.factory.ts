import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { Event, EventProps } from '@koiner/chain/domain';
import { EventSchema } from './event.schema';
import { UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { ContractStandardType } from '@koiner/contracts/domain';

export class EventSchemaFactory extends EntitySchemaFactory<
  Event,
  EventSchema
> {
  protected toDomainProps(entitySchema: EventSchema): EntityProps<EventProps> {
    const id = new UUID(entitySchema.id);

    const props: EventProps = {
      transactionId: new KoinosId(entitySchema.transaction_id),
      sequence: entitySchema.sequence,
      contractId: new KoinosAddressId(entitySchema.contract_id),
      contractStandardType:
        entitySchema.contract_standard_type as ContractStandardType,
      name: entitySchema.name,
      data: entitySchema.data,
      impacted: entitySchema.impacted.map(
        (impacted) => new KoinosAddressId(impacted),
      ),
    };

    return { id, props };
  }

  protected toSchemaProps(entity: Event): EntitySchemaProps<EventSchema> {
    const props = entity.getPropsCopy();

    return {
      transaction_id: props.transactionId.value,
      transaction: null,
      sequence: props.sequence,
      contract_id: props.contractId.value,
      contract_standard_type: props.contractStandardType,
      name: props.name,
      data: props.data,
      impacted: props.impacted.map((impacted) => impacted.value),
    };
  }
}
