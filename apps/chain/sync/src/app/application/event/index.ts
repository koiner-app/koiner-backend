import { CommandBus } from '@nestjs/cqrs';
import { SyncAddressOnAddressUsed } from './address/sync-address-on-address-used';
import { SyncEventsForNewBlock } from './event/sync-events-for-new-block';
import { SyncEventsForNewTransaction } from './event/sync-events-for-new-transaction';
import { SyncOperationsForNewTransaction } from './operation/sync-operations-for-new-transaction';
import { SyncTransactionsForNewBlock } from './transaction/sync-transactions-for-new-block';
import { CreateSystemCallOperationForNewOperation } from './operation/create-system-call-operation-for-new-operation';
import { CreateSystemContractOperationForNewOperation } from './operation/create-system-contract-operation-for-new-operation';
import { CreateUploadOperationForNewOperation } from './operation/create-upload-operation-for-new-operation';
import { SyncBlocksOnSynchronizationBatchStarted } from './sync/sync-blocks-on-synchronization-batch-started';

export const ChainSyncEventHandlers = [
  // EventEmitter
  SyncAddressOnAddressUsed,
  SyncBlocksOnSynchronizationBatchStarted,
  SyncEventsForNewBlock,
  SyncEventsForNewTransaction,
  SyncOperationsForNewTransaction,
  SyncTransactionsForNewBlock,

  // DomainEventHandlers

  //
  // Operations
  //
  {
    provide: CreateSystemCallOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus
    ): CreateSystemCallOperationForNewOperation => {
      const eventHandler = new CreateSystemCallOperationForNewOperation(
        commandBus
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus],
  },

  {
    provide: CreateSystemContractOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus
    ): CreateSystemContractOperationForNewOperation => {
      const eventHandler = new CreateSystemContractOperationForNewOperation(
        commandBus
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus],
  },

  {
    provide: CreateUploadOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus
    ): CreateUploadOperationForNewOperation => {
      const eventHandler = new CreateUploadOperationForNewOperation(commandBus);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus],
  },
];
