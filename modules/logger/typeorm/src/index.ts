import { Provider } from '@nestjs/common';
import { EventLogModels, EventLogRepositories } from './event-log';

export * from './event-log';

export const KoinerLoggerModuleModels = [...EventLogModels];
export const KoinerLoggerModuleRepositories: Provider[] = [
  ...EventLogRepositories,
];
