import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { OperationNode } from '@koiner/chain/api/graphql/operation/dto/operation.node';
import { OperationQuery } from '@koiner/chain/application/operation/query';

@Resolver(() => OperationNode)
export class OperationResolver extends NodeQuery(
  OperationNode,
  OperationQuery,
  'operation',
) {}
