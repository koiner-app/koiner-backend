import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import {
  TokenContractQuery,
  TokenEventQuery,
  TokenHolderQuery,
  TokenOperationQuery,
} from '@koiner/contracts/application';
import {
  TokenContractNode,
  TokenEventNode,
  TokenHolderNode,
  TokenOperationNode,
} from '../dto';

@Resolver(() => TokenContractNode)
export class TokenContractResolver extends NodeQuery(
  TokenContractNode,
  TokenContractQuery,
  'tokenContract'
) {}

@Resolver(() => TokenEventNode)
export class TokenEventResolver extends NodeQuery(
  TokenEventNode,
  TokenEventQuery,
  'tokenEvent'
) {}

@Resolver(() => TokenHolderNode)
export class TokenHolderResolver extends NodeQuery(
  TokenHolderNode,
  TokenHolderQuery,
  'tokenHolder'
) {}

@Resolver(() => TokenOperationNode)
export class TokenOperationResolver extends NodeQuery(
  TokenOperationNode,
  TokenOperationQuery,
  'tokenOperation'
) {}

export * from './token-contract-holders.resolver';
export * from './token-contract-operations.resolver';
export * from './token-contracts.resolver';
export * from './token-event-contract.resolver';
export * from './token-event-contract-event.resolver';
export * from './token-events.resolver';
export * from './token-holders.resolver';
export * from './token-holder-contract.resolver';
export * from './token-operation-contract.resolver';
export * from './token-operations.resolver';
