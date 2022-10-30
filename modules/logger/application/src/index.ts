import { EventLogApplicationHandlers } from './event-log';

export * from './event-log';

export const KoinerLoggerModuleApplicationHandlers = [
  ...EventLogApplicationHandlers,
];
