import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { OperationQuery } from '@koiner/chain/application';
import { OperationNode } from '../dto';

@Resolver(() => OperationNode)
export class OperationResolver extends NodeQuery(
  OperationNode,
  OperationQuery,
  'operation',
) {}

export * from './operation-type.resolver';
export * from './operations.resolver';
