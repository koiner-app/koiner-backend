import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { TransactionQuery } from '@koiner/chain/application';
import { TransactionNode } from '../dto';

@Resolver(() => TransactionNode)
export class TransactionResolver extends NodeQuery(
  TransactionNode,
  TransactionQuery,
  'transaction'
) {}

export * from './transactions.resolver';
export * from './transactions-bulk.resolver';
export * from './transaction-events.resolver';
