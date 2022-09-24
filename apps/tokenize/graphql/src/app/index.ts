import { TokenContractGraphQLServices } from './contract';
import { TokenEventGraphQLServices } from './event';
import { TokenHolderGraphQLServices } from './holder';
import { TokenOperationGraphQLServices } from './operation';

export * from './contract';
export * from './event';
export * from './holder';
export * from './operation';

export const TokenizeModuleGraphQLServices = [
  ...TokenContractGraphQLServices,
  ...TokenEventGraphQLServices,
  ...TokenHolderGraphQLServices,
  ...TokenOperationGraphQLServices,
];
