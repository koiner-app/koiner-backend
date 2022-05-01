import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { TokenContractNode } from '../dto/token-contract.node';
import { TokenOperationNode } from '../dto/token-operation.node';
import {
  TokenContractQuery,
  TokenOperationQuery,
} from '@koiner/contracts/application/token/query';

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
