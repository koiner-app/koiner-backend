import { CommandBus } from '@nestjs/cqrs';
import { provideEventHandler } from '@koiner/nestjs-utils';
import { RawBlocksService } from '@koinos/jsonrpc';
import { SyncAddressOnContractsAddressCreated } from './sync-address-on-contracts-address-created';
import { SyncAddressOnContractsAddressMarkedAsProducer } from './sync-address-on-contracts-address-marked-as-producer';
import { SyncEventsForNewBlock } from './sync-events-for-new-block';
import { SyncEventsForNewTransaction } from './sync-events-for-new-transaction';
import { SyncOperationsForNewTransaction } from './sync-operations-for-new-transaction';
import { SyncTransactionsForNewBlock } from './sync-transactions-for-new-block';
import { CreateSystemCallOperationForNewOperation } from './create-system-call-operation-for-new-operation';
import { CreateSystemContractOperationForNewOperation } from './create-system-contract-operation-for-new-operation';
import { CreateUploadOperationForNewOperation } from './create-upload-operation-for-new-operation';

export const ChainSyncEventHandlers = [
  // EventEmitter
  SyncAddressOnContractsAddressCreated,
  SyncAddressOnContractsAddressMarkedAsProducer,

  // DomainEventHandlers
  provideEventHandler(SyncTransactionsForNewBlock),

  {
    provide: SyncOperationsForNewTransaction,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService
    ): SyncOperationsForNewTransaction => {
      const eventHandler = new SyncOperationsForNewTransaction(
        commandBus,
        rawBlocksService
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },

  {
    provide: SyncEventsForNewBlock,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService
    ): SyncEventsForNewBlock => {
      const eventHandler = new SyncEventsForNewBlock(
        commandBus,
        rawBlocksService
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },

  {
    provide: SyncEventsForNewTransaction,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService
    ): SyncEventsForNewTransaction => {
      const eventHandler = new SyncEventsForNewTransaction(
        commandBus,
        rawBlocksService
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },

  //
  // Operations
  //
  {
    provide: CreateSystemCallOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService
    ): CreateSystemCallOperationForNewOperation => {
      const eventHandler = new CreateSystemCallOperationForNewOperation(
        commandBus,
        rawBlocksService
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },

  {
    provide: CreateSystemContractOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService
    ): CreateSystemContractOperationForNewOperation => {
      const eventHandler = new CreateSystemContractOperationForNewOperation(
        commandBus,
        rawBlocksService
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },

  {
    provide: CreateUploadOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService
    ): CreateUploadOperationForNewOperation => {
      const eventHandler = new CreateUploadOperationForNewOperation(
        commandBus,
        rawBlocksService
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },
];
