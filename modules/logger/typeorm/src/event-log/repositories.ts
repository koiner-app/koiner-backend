import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import { EventLogSchema, EventLogSchemaFactory } from '.';
import {
  EventLog,
  EventLogReadRepository,
  EventLogWriteRepository,
} from '@koiner/logger/domain';

// Factories
const eventLogSchemaFactory = new EventLogSchemaFactory(
  EventLog,
  EventLogSchema
);

export const EventLogRepositories: Provider[] = [
  // EventLog
  TypeormRepositoryProvider.provide(
    EventLogReadRepository,
    EventLogSchema,
    eventLogSchemaFactory
  ),
  TypeormRepositoryProvider.provide(
    EventLogWriteRepository,
    EventLogSchema,
    eventLogSchemaFactory
  ),
];
