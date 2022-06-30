import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { ContractQuery } from '@koiner/contracts/application';
import { ContractNode } from '../dto/contract.node';

@Resolver(() => ContractNode)
export class ContractResolver extends NodeQuery(
  ContractNode,
  ContractQuery,
  'contract'
) {}

export * from './contracts.resolver';
export * from './contracts-bulk.resolver';
