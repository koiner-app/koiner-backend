import { CommandBus } from '@nestjs/cqrs';
import { provideEventHandler } from '@appvise/nestjs-utils';
import { RawBlocksService } from '@koinos/raw-blocks.service';
import { SyncTransactionsForNewBlock } from './sync-transactions-for-new-block';
import { SyncOperationsForNewTransaction } from '@koiner/chain/sync/application/event/sync-operations-for-new-transaction';
import { SyncEventsForNewTransaction } from '@koiner/chain/sync/application/event/sync-events-for-new-transaction';

export default [
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
