import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { ContractNode } from '../dto/contract.node';
import { ContractQuery } from '@koiner/contracts/application/contract/query';

@Resolver(() => ContractNode)
export class ContractResolver extends NodeQuery(
  ContractNode,
  ContractQuery,
  'contract',
) {}
