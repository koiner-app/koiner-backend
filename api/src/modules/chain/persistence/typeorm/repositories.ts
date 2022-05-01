import { TypeormRepositoryProvider } from '@appvise/typeorm';
import {
  Address,
  AddressReadRepository,
  AddressWriteRepository,
  Block,
  BlockReadRepository,
  BlockWriteRepository,
  Chain,
  ChainReadRepository,
  ChainWriteRepository,
  Event,
  EventReadRepository,
  EventWriteRepository,
  Operation,
  OperationReadRepository,
  OperationWriteRepository,
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
  AddressSchema,
  AddressSchemaFactory,
  ChainSchema,
  ChainSchemaFactory,
  EventSchema,
  EventSchemaFactory,
  OperationSchema,
  OperationSchemaFactory,
  SystemCallOperationSchema,
  SystemCallOperationSchemaFactory,
  SystemContractOperationSchema,
  SystemContractOperationSchemaFactory,
  TransactionSchema,
  TransactionSchemaFactory,
  UploadContractOperationSchema,
  UploadContractOperationSchemaFactory,
} from '@koiner/chain/persistence/typeorm';
import { BlockReadTypeormRepository } from './block/block.read.typeorm.repository';

const addressSchemaFactory = new AddressSchemaFactory(Address, AddressSchema);
const blockSchemaFactory = new BlockSchemaFactory(Block, BlockSchema);
const chainSchemaFactory = new ChainSchemaFactory(Chain, ChainSchema);
const eventSchemaFactory = new EventSchemaFactory(Event, EventSchema);
const transactionSchemaFactory = new TransactionSchemaFactory(
  Transaction,
  TransactionSchema,
);
const operationSchemaFactory = new OperationSchemaFactory(
  Operation,
  OperationSchema,
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
  TypeormRepositoryProvider.provide(
    AddressWriteRepository,
    AddressSchema,
    addressSchemaFactory,
    false,
  ),

  // Block
  {
    provide: BlockReadRepository,
    useClass: BlockReadTypeormRepository,
  },
  TypeormRepositoryProvider.provide(
    BlockWriteRepository,
    BlockSchema,
    blockSchemaFactory,
    false,
  ),

  // Chain
  TypeormRepositoryProvider.provide(
    ChainReadRepository,
    ChainSchema,
    chainSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    ChainWriteRepository,
    ChainSchema,
    chainSchemaFactory,
    false,
  ),

  // Event
  TypeormRepositoryProvider.provide(
    EventReadRepository,
    EventSchema,
    eventSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    EventWriteRepository,
    EventSchema,
    eventSchemaFactory,
    false,
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
    false,
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
  TypeormRepositoryProvider.provide(
    OperationWriteRepository,
    OperationSchema,
    operationSchemaFactory,
    false,
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
    false,
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
    false,
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
    false,
  ),
];
