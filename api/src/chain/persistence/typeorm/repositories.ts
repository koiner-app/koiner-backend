import { TypeormRepositoryProvider } from '@appvise/typeorm';
import {
  Address,
  AddressReadRepository,
  AddressWriteRepository,
  Block,
  BlockReadRepository,
  BlockWriteRepository,
  ContractOperation,
  ContractOperationReadRepository,
  ContractOperationWriteRepository,
  Operation,
  OperationReadRepository,
  SystemCallOperation,
  SystemCallOperationReadRepository,
  SystemCallOperationWriteRepository,
  SystemContractOperation,
  SystemContractOperationReadRepository,
  SystemContractOperationWriteRepository,
  Transaction,
  TransactionReadRepository,
  TransactionWriteRepository,
  UploadContractOperation,
  UploadContractOperationReadRepository,
  UploadContractOperationWriteRepository,
} from '@koiner/chain/domain';
import { BlockSchema, BlockSchemaFactory } from './block';
import {
  OperationSchema,
  TransactionSchema,
  TransactionSchemaFactory,
} from './transaction';
import { BlockReadTypeormRepository } from './block/block.read.typeorm.repository';
import {
  AddressSchema,
  AddressSchemaFactory,
} from '@koiner/chain/persistence/typeorm/address';
import { AddressWriteTypeormRepository } from '@koiner/chain/persistence/typeorm/address/address.write.typeorm.repository';
import { UploadContractOperationSchema } from '@koiner/chain/persistence/typeorm/operation/upload-contract-operation.schema';
import { UploadContractOperationSchemaFactory } from '@koiner/chain/persistence/typeorm/operation/upload-contract-operation-schema.factory';
import { OperationSchemaFactory } from '@koiner/chain/persistence/typeorm/operation/operation-schema.factory';
import { ContractOperationSchema } from '@koiner/chain/persistence/typeorm/operation/contract-operation.schema';
import { ContractOperationSchemaFactory } from '@koiner/chain/persistence/typeorm/operation/contract-operation-schema.factory';
import { SystemContractOperationSchema } from '@koiner/chain/persistence/typeorm/operation/system-contract-operation.schema';
import { SystemContractOperationSchemaFactory } from '@koiner/chain/persistence/typeorm/operation/system-contract-operation-schema.factory';
import { SystemCallOperationSchemaFactory } from '@koiner/chain/persistence/typeorm/operation/system-call-operation-schema.factory';
import { SystemCallOperationSchema } from '@koiner/chain/persistence/typeorm/operation/system-call-operation.schema';

const addressSchemaFactory = new AddressSchemaFactory(Address, AddressSchema);
const blockSchemaFactory = new BlockSchemaFactory(Block, BlockSchema);
const transactionSchemaFactory = new TransactionSchemaFactory(
  Transaction,
  TransactionSchema,
);
const operationSchemaFactory = new OperationSchemaFactory(
  Operation,
  OperationSchema,
);
const contractOperationSchemaFactory = new ContractOperationSchemaFactory(
  ContractOperation,
  ContractOperationSchema,
);
const systemCallOperationSchemaFactory = new SystemCallOperationSchemaFactory(
  SystemCallOperation,
  SystemCallOperationSchema,
);
const systemContractOperationSchemaFactory =
  new SystemContractOperationSchemaFactory(
    SystemContractOperation,
    SystemContractOperationSchema,
  );
const uploadContractOperationSchemaFactory =
  new UploadContractOperationSchemaFactory(
    UploadContractOperation,
    UploadContractOperationSchema,
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

  //
  // Operations
  //

  // Operation
  TypeormRepositoryProvider.provide(
    OperationReadRepository,
    OperationSchema,
    operationSchemaFactory,
  ),

  // ContractOperation
  TypeormRepositoryProvider.provide(
    ContractOperationReadRepository,
    ContractOperationSchema,
    contractOperationSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    ContractOperationWriteRepository,
    ContractOperationSchema,
    contractOperationSchemaFactory,
  ),

  // SystemCallOperation
  TypeormRepositoryProvider.provide(
    SystemCallOperationReadRepository,
    SystemCallOperationSchema,
    systemCallOperationSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    SystemCallOperationWriteRepository,
    SystemCallOperationSchema,
    systemCallOperationSchemaFactory,
  ),

  // SystemContractOperation
  TypeormRepositoryProvider.provide(
    SystemContractOperationReadRepository,
    SystemContractOperationSchema,
    systemContractOperationSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    SystemContractOperationWriteRepository,
    SystemContractOperationSchema,
    systemContractOperationSchemaFactory,
  ),

  // UploadContractOperation
  TypeormRepositoryProvider.provide(
    UploadContractOperationReadRepository,
    UploadContractOperationSchema,
    uploadContractOperationSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    UploadContractOperationWriteRepository,
    UploadContractOperationSchema,
    uploadContractOperationSchemaFactory,
  ),
];
