import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { TransactionNode } from '.';

@ObjectType()
export class TransactionsConnection extends Connection(TransactionNode) {}
