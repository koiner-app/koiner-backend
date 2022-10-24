import { Provider } from '@nestjs/common';
import { StatsModels, StatsRepositories } from './stats';
import { TokenModels, TokenRepositories } from './token';

export * from './token';

export const TokenizeModels = [...StatsModels, ...TokenModels];
export const TokenizeModuleRepositories: Provider[] = [
  ...StatsRepositories,
  ...TokenRepositories,
];
