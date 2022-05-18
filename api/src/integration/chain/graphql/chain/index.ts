import { AddressTokenOperationsFieldResolver } from './address-token-operations-field.resolver';
import { OperationDetailsResolver } from './operation-details.resolver';

export const ChainIntegrationGraphQLServices = [
  AddressTokenOperationsFieldResolver,
  OperationDetailsResolver,
];
