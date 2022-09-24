import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { TokenOperationQuery } from '@koiner/tokenize/application';
import { TokenOperationNode } from '../dto';

@Resolver(() => TokenOperationNode)
export class TokenOperationResolver extends NodeQuery(
  TokenOperationNode,
  TokenOperationQuery,
  'tokenOperation'
) {}

export * from './token-operation-contract.resolver';
export * from './token-operations.resolver';
