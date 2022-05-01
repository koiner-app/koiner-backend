import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { AddressNode } from './dto/address.node';
import { AddressQuery } from '@koiner/chain/application/address/query';

@Resolver(() => AddressNode)
export class AddressResolver extends NodeQuery(
  AddressNode,
  AddressQuery,
  'address',
) {}
