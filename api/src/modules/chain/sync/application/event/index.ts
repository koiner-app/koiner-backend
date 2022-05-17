import { CommandBus } from '@nestjs/cqrs';
import { provideEventHandler } from '@appvise/nestjs-utils';
import { RawBlocksService } from '@koinos/raw-blocks.service';
import { SyncEventsForNewTransaction } from './sync-events-for-new-transaction';
import { SyncOperationsForNewTransaction } from './sync-operations-for-new-transaction';
import { SyncTransactionsForNewBlock } from './sync-transactions-for-new-block';

export const ChainSyncEventHandlers = [
  provideEventHandler(SyncTransactionsForNewBlock),

  {
    provide: SyncOperationsForNewTransaction,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService,
    ): SyncOperationsForNewTransaction => {
      const eventHandler = new SyncOperationsForNewTransaction(
        commandBus,
        rawBlocksService,
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
      rawBlocksService: RawBlocksService,
    ): SyncEventsForNewTransaction => {
      const eventHandler = new SyncEventsForNewTransaction(
        commandBus,
        rawBlocksService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },
];
