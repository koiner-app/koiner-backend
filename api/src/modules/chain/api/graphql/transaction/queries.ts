import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { TransactionNode } from '@koiner/chain/api/graphql/transaction/dto/transaction.node';
import { TransactionQuery } from '@koiner/chain/application/transaction/query';

@Resolver(() => TransactionNode)
export class TransactionResolver extends NodeQuery(
  TransactionNode,
  TransactionQuery,
  'transaction',
) {}
