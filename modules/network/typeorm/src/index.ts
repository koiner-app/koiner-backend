import { Provider } from '@nestjs/common';
import {
  BlockProductionModels,
  BlockProductionRepositories,
} from './block-production';

export * from './block-production';

export const NetworkModels = [...BlockProductionModels];
export const NetworkModuleRepositories: Provider[] = [
  ...BlockProductionRepositories,
];
