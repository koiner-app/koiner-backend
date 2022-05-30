import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  Transaction,
  TransactionReadRepository,
  TransactionWriteRepository,
} from '@koiner/chain/domain';
import { TransactionSchema, TransactionSchemaFactory } from '.';

// Factories
const transactionSchemaFactory = new TransactionSchemaFactory(
  Transaction,
  TransactionSchema,
);

export const TransactionRepositories: Provider[] = [
  // Transaction
  TypeormRepositoryProvider.provide(
    TransactionReadRepository,
    TransactionSchema,
    transactionSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    TransactionWriteRepository,
    TransactionSchema,
    transactionSchemaFactory,
    false,
  ),
];
