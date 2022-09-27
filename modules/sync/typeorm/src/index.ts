import { Provider } from '@nestjs/common';
import {
  SynchronizationModels,
  SynchronizationRepositories,
} from './synchronization';

export * from './synchronization';

export const SynchronizationModuleModels = [...SynchronizationModels];
export const SynchronizationModuleRepositories: Provider[] = [
  ...SynchronizationRepositories,
];
