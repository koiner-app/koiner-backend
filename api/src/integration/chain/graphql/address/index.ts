import { AddressBlockRewardsFieldResolver } from './address-reward.resolver';
import { AddressTokenOperationsFieldResolver } from './address-token-operations-field.resolver';

export const AddressIntegrationGraphQLServices = [
  AddressBlockRewardsFieldResolver,
  AddressTokenOperationsFieldResolver,
];
