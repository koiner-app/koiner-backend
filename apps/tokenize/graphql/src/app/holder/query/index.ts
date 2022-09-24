import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { TokenHolderQuery } from '@koiner/tokenize/application';
import { TokenHolderNode } from '../dto';

@Resolver(() => TokenHolderNode)
export class TokenHolderResolver extends NodeQuery(
  TokenHolderNode,
  TokenHolderQuery,
  'tokenHolder'
) {}

export * from './token-holders.resolver';
export * from './token-holder-contract.resolver';
