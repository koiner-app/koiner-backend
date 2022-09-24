import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { TokenContractQuery } from '@koiner/tokenize/application';
import { TokenContractNode } from '../dto';

@Resolver(() => TokenContractNode)
export class TokenContractResolver extends NodeQuery(
  TokenContractNode,
  TokenContractQuery,
  'tokenContract'
) {}

export * from './token-contract-holders.resolver';
export * from './token-contract-operations.resolver';
export * from './token-contracts.resolver';
