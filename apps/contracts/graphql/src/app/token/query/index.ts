import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import {
  TokenBalanceQuery,
  TokenContractQuery,
  TokenEventQuery,
  TokenOperationQuery,
} from '@koiner/contracts/application';
import {
  TokenBalanceNode,
  TokenContractNode,
  TokenEventNode,
  TokenOperationNode,
} from '../dto';

@Resolver(() => TokenBalanceNode)
export class TokenBalanceResolver extends NodeQuery(
  TokenBalanceNode,
  TokenBalanceQuery,
  'tokenBalance'
) {}

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

@Resolver(() => TokenOperationNode)
export class TokenOperationResolver extends NodeQuery(
  TokenOperationNode,
  TokenOperationQuery,
  'tokenOperation'
) {}

export * from './token-balances.resolver';
export * from './token-balance-contract.resolver';
export * from './token-contract-balances.resolver';
export * from './token-contract-operations.resolver';
export * from './token-contracts.resolver';
export * from './token-event-contract.resolver';
export * from './token-event-contract-event.resolver';
export * from './token-events.resolver';
export * from './token-operation-contract.resolver';
export * from './token-operations.resolver';
