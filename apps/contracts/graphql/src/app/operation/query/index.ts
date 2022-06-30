import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { ContractOperationQuery } from '@koiner/contracts/application';
import { ContractOperationNode } from '../dto/contract-operation.node';

@Resolver(() => ContractOperationNode)
export class ContractOperationResolver extends NodeQuery(
  ContractOperationNode,
  ContractOperationQuery,
  'contractOperation'
) {}

export * from './contract-operation-details.resolver';
export * from './contract-operations.resolver';
export * from './contract-operations-bulk.resolver';
