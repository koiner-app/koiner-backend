import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { TokenEventQuery } from '@koiner/tokenize/application';
import { TokenEventNode } from '../dto';

@Resolver(() => TokenEventNode)
export class TokenEventResolver extends NodeQuery(
  TokenEventNode,
  TokenEventQuery,
  'tokenEvent'
) {}

export * from './token-event-contract.resolver';
export * from './token-events.resolver';
