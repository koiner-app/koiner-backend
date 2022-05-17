import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import {
  TokenContractQuery,
  TokenOperationQuery,
} from '@koiner/contracts/application';
import { TokenContractNode, TokenOperationNode } from '../dto';

@Resolver(() => TokenContractNode)
export class TokenContractResolver extends NodeQuery(
  TokenContractNode,
  TokenContractQuery,
  'tokenContract',
) {}

@Resolver(() => TokenOperationNode)
export class TokenOperationResolver extends NodeQuery(
  TokenOperationNode,
  TokenOperationQuery,
  'tokenOperation',
) {}

export * from './token-contract-operations.resolver';
export * from './token-contracts.resolver';
export * from './token-operations.resolver';
