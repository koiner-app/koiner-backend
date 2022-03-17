import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { Krc20ContractNode } from '../dto/krc20-contract.node';
import { Krc20ContractQuery } from '@koiner/contracts/application/krc20/query';

@Resolver(() => Krc20ContractNode)
export class Krc20ContractResolver extends NodeQuery(
  Krc20ContractNode,
  Krc20ContractQuery,
  'contract',
) {}
