import { AddressIntegrationGraphQLServices } from './address';
import { BlockIntegrationGraphQLServices } from './block';
import { OperationIntegrationGraphQLServices } from './operation';

export const ChainIntegrationGraphqlServices = [
  ...AddressIntegrationGraphQLServices,
  ...BlockIntegrationGraphQLServices,
  ...OperationIntegrationGraphQLServices,
];
