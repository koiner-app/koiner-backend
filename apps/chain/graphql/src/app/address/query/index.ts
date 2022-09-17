import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { AddressQuery } from '@koiner/chain/application';
import { AddressNode } from '../dto/address.node';

@Resolver(() => AddressNode)
export class AddressResolver extends NodeQuery(
  AddressNode,
  AddressQuery,
  'address'
) {}

export * from './addresses.resolver';
export * from './addresses-bulk.resolver';
export * from './address-transactions.resolver';
