import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { TransactionNode } from './transaction.node';

@ObjectType()
export class TransactionsConnection extends Connection(TransactionNode) {}
