import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  Event,
  EventReadRepository,
  EventWriteRepository,
} from '@koiner/chain/domain';
import { EventSchema, EventSchemaFactory } from '.';

// Factories
const eventSchemaFactory = new EventSchemaFactory(Event, EventSchema);

export const EventRepositories: Provider[] = [
  // Event
  TypeormRepositoryProvider.provide(
    EventReadRepository,
    EventSchema,
    eventSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    EventWriteRepository,
    EventSchema,
    eventSchemaFactory,
    false,
  ),
];
