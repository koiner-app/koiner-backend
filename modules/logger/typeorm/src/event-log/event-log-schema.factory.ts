import {
  EntityProps as TypeOrmEntityProps,
  EntitySchemaFactory as TypeOrmEntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { UUID } from '@appvise/domain';
import { EventLog, EventLogProps } from '@koiner/logger/domain';
import { EventLogSchema } from './event-log.schema';

export class EventLogSchemaFactory extends TypeOrmEntitySchemaFactory<
  EventLog,
  EventLogSchema
> {
  protected toDomainProps(
    eventLogSchema: EventLogSchema
  ): TypeOrmEntityProps<EventLogProps> {
    const id = new UUID(eventLogSchema.id);

    const props: EventLogProps = {
      eventName: eventLogSchema.event_name,
      data: eventLogSchema.data ?? undefined,
      itemId: eventLogSchema.item_id,
      itemType: eventLogSchema.item_type,
      timestamp: eventLogSchema.timestamp,
      count: eventLogSchema.count,
    };

    return { id, props };
  }

  protected toSchemaProps(
    eventLog: EventLog
  ): EntitySchemaProps<EventLogSchema> {
    const props = eventLog.getPropsCopy();

    return {
      event_name: props.eventName,
      data: props.data,
      item_id: props.itemId,
      item_type: props.itemType,
      timestamp: props.timestamp,
      count: props.count,
    };
  }
}
