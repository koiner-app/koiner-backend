import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { ContractOperationNode } from './dto/contract-operation.node';
import { ContractOperationQuery } from '@koiner/contracts/application/operation/query';

@Resolver(() => ContractOperationNode)
export class ContractOperationResolver extends NodeQuery(
  ContractOperationNode,
  ContractOperationQuery,
  'contractOperation',
) {}
