import { TypeormRepositoryProvider } from '@appvise/typeorm';
import {
  Address,
  AddressReadRepository,
  AddressWriteRepository,
  Block,
  BlockReadRepository,
  BlockWriteRepository,
  Contract,
  ContractReadRepository,
  ContractWriteRepository,
  Transaction,
  TransactionReadRepository,
  TransactionWriteRepository,
} from '@koiner/chain/domain';
import { BlockSchema, BlockSchemaFactory } from './block';
import { TransactionSchema, TransactionSchemaFactory } from './transaction';
import { BlockReadTypeormRepository } from './block/block.read.typeorm.repository';
import {
  ContractSchema,
  ContractSchemaFactory,
} from '@koiner/chain/persistence/typeorm/contract';
import {
  AddressSchema,
  AddressSchemaFactory,
} from '@koiner/chain/persistence/typeorm/address';
import { AddressWriteTypeormRepository } from '@koiner/chain/persistence/typeorm/address/address.write.typeorm.repository';

const addressSchemaFactory = new AddressSchemaFactory(Address, AddressSchema);
const blockSchemaFactory = new BlockSchemaFactory(Block, BlockSchema);
const contractSchemaFactory = new ContractSchemaFactory(
  Contract,
  ContractSchema,
);
const transactionSchemaFactory = new TransactionSchemaFactory(
  Transaction,
  TransactionSchema,
);

export default [
  // Block
  TypeormRepositoryProvider.provide(
    AddressReadRepository,
    AddressSchema,
    addressSchemaFactory,
  ),
  {
    provide: AddressWriteRepository,
    useClass: AddressWriteTypeormRepository,
  },

  // Block
  {
    provide: BlockReadRepository,
    useClass: BlockReadTypeormRepository,
  },
  TypeormRepositoryProvider.provide(
    BlockWriteRepository,
    BlockSchema,
    blockSchemaFactory,
  ),

  // Contract
  TypeormRepositoryProvider.provide(
    ContractReadRepository,
    ContractSchema,
    contractSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    ContractWriteRepository,
    ContractSchema,
    contractSchemaFactory,
  ),

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
  ),
];
