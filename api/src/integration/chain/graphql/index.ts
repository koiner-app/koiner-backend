import { BlockIntegrationGraphQLServices } from './block';
import { ChainIntegrationGraphQLServices } from './chain';

export default [
  ...BlockIntegrationGraphQLServices,
  ...ChainIntegrationGraphQLServices,
];
