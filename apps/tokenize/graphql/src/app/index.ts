import { TokenContractGraphQLServices } from './contract';
import { TokenEventGraphQLServices } from './event';
import { TokenHolderGraphQLServices } from './holder';
import { TokenOperationGraphQLServices } from './operation';
import { StatsGraphQLServices } from './stats';

export * from './contract';
export * from './event';
export * from './holder';
export * from './operation';
export * from './stats';

export const TokenizeModuleGraphQLServices = [
  ...TokenContractGraphQLServices,
  ...TokenEventGraphQLServices,
  ...TokenHolderGraphQLServices,
  ...TokenOperationGraphQLServices,
  ...StatsGraphQLServices,
];
