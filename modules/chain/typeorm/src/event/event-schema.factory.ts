import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { Event, EventProps } from '@koiner/chain/domain';
import { EventSchema } from '.';

export class EventSchemaFactory extends EntitySchemaFactory<
  Event,
  EventSchema
> {
  protected toDomainProps(entitySchema: EventSchema): EntityProps<EventProps> {
    const id = new UUID(entitySchema.id);

    const props: EventProps = {
      transactionId: new KoinosId(entitySchema.transaction_id),
      sequence: entitySchema.sequence,
      contractId: entitySchema.contract_id
        ? new KoinosAddressId(entitySchema.contract_id)
        : undefined,
      name: entitySchema.name,
      data: (entitySchema.data as unknown as Uint8Array).toString(),
      impacted: entitySchema.impacted
        ? entitySchema.impacted.map((impacted) => new KoinosAddressId(impacted))
        : undefined,
    };

    return { id, props };
  }

  protected toSchemaProps(entity: Event): EntitySchemaProps<EventSchema> {
    const props = entity.getPropsCopy();

    return {
      transaction_id: props.transactionId.value,
      // TODO: How to handle this?
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      transaction: null,
      sequence: props.sequence,
      contract_id: props.contractId ? props.contractId.value : undefined,
      name: props.name,
      data: props.data,
      impacted: props.impacted
        ? props.impacted.map((impacted) => impacted.value)
        : undefined,
    };
  }
}
