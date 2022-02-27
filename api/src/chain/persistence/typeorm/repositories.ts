import { TypeormRepositoryProvider } from '@appvise/typeorm';
import {
  Block,
  BlockReadRepository,
  BlockWriteRepository,
  Transaction,
  TransactionReadRepository,
  TransactionWriteRepository,
} from '@koiner/chain/domain';
import { BlockSchema, BlockSchemaFactory } from './block';
import { TransactionSchema, TransactionSchemaFactory } from './transaction';
import { BlockReadTypeormRepository } from './block/block.read.typeorm.repository';

const blockSchemaFactory = new BlockSchemaFactory(Block, BlockSchema);
const transactionSchemaFactory = new TransactionSchemaFactory(
  Transaction,
  TransactionSchema,
);

export default [
  {
    provide: BlockReadRepository,
    useClass: BlockReadTypeormRepository,
  },
  TypeormRepositoryProvider.provide(
    BlockWriteRepository,
    BlockSchema,
    blockSchemaFactory,
  ),

  TypeormRepositoryProvider.provide(
    TransactionReadRepository,
    TransactionSchema,
    transactionSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    TransactionWriteRepository,
    TransactionSchema,
    transactionSchemaFactory,
  ),
];
