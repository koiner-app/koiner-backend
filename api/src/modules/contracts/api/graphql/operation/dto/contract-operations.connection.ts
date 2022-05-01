import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { ContractOperationNode } from './contract-operation.node';

@ObjectType()
export class ContractOperationsConnection extends Connection(
  ContractOperationNode,
) {}
