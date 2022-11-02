import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Provider } from 'koilib';
import { Logger } from '@appvise/domain';
import { ChainId } from '@koiner/domain';
import {
  StopSignal,
  Synchronization,
  SynchronizationWriteRepository,
} from '@koiner/sync/domain';
import { StopSignalQuery } from '../query';
import { StartSynchronizationBatchCommand } from './dto/start-synchronization-batch.command';

@CommandHandler(StartSynchronizationBatchCommand)
export class StartSynchronizationBatchHandler
  implements ICommandHandler<StartSynchronizationBatchCommand>
{
  constructor(
    private readonly writeRepository: SynchronizationWriteRepository,
    private readonly queryBus: QueryBus,
    private readonly provider: Provider,
    private readonly logger: Logger
  ) {}

  async execute(command: StartSynchronizationBatchCommand): Promise<void> {
    const chainId = command.chainId;
    let batchSize = command.batchSize;

    if (!batchSize) {
      batchSize = process.env['SYNC_BATCH_SIZE']
        ? parseInt(process.env['SYNC_BATCH_SIZE'])
        : 100;
    }

    this.logger.log('Start syncing!');

    let synchronization: Synchronization | undefined =
      await this.writeRepository.findOneById(chainId);

    // Only fetch headInfo when really needed to prevent unnecessary calls to JSON RPC
    let headInfo;

    /**
     * Create new synchronization if none has not started yet
     */
    if (!synchronization) {
      headInfo = await this.provider.getHeadInfo();

      // Where to start syncing
      const initialHeight = process.env['SYNC_INITIAL_HEIGHT']
        ? parseInt(process.env['SYNC_INITIAL_HEIGHT'])
        : 0;

      synchronization = Synchronization.create(
        {
          headTopologyHeight: parseInt(headInfo.head_topology.height),
          lastIrreversibleBlock: parseInt(headInfo.last_irreversible_block),
          lastSyncedBlock: initialHeight,
        },
        new ChainId(chainId)
      );

      await this.writeRepository.save(synchronization);
    }

    /**
     * Check if synchronization has been stopped
     */
    if (!synchronization || synchronization.stopped) {
      this.logger.log('Do not sync, stopped');

      return;
    }

    /**
     * Check if synchronization is still running
     */
    if (
      synchronization &&
      synchronization.syncing &&
      synchronization.batchStartedAt
    ) {
      this.logger.log('Do not sync, still syncing');

      const syncTimeout = process.env['SYNC_TIME_OUT']
        ? parseInt(process.env['SYNC_TIME_OUT'])
        : 600000;

      if (Date.now() - synchronization.batchStartedAt > syncTimeout) {
        console.error(
          `Sync has timed out. Reset sync to last checkpoint: ${synchronization.lastSyncedBlock}`
        );

        synchronization.timedOut();

        await this.writeRepository.save(synchronization);
      }

      // Always stop here when still running
      return;
    }

    if (!headInfo) {
      headInfo = await this.provider.getHeadInfo();
    }

    /**
     * Try starting next batch
     */
    const lastIrreversibleBlock = parseInt(headInfo.last_irreversible_block);

    const startHeight =
      parseInt(synchronization.lastSyncedBlock.toString()) + 1;
    let endHeight = startHeight + (batchSize - 1);

    // Make sure we only process irreversible blocks
    if (endHeight > lastIrreversibleBlock) {
      endHeight = lastIrreversibleBlock;
    }

    /**
     * Check if a stop signal has been given
     */
    try {
      const stopSignal: StopSignal = await this.queryBus.execute<
        StopSignalQuery,
        StopSignal
      >(new StopSignalQuery(synchronization.id.value));

      this.logger.log(`Stop signal present: ${stopSignal.stopAtHeight}`);

      // Stop if stopAtHeight has been reached
      if (startHeight > stopSignal.stopAtHeight) {
        this.logger.log(
          `Stop if stopAtHeight has been reached ${startHeight} > ${stopSignal.stopAtHeight}`
        );

        synchronization.stop();

        await this.writeRepository.save(synchronization);

        return;
      }

      // Process last batch if endHeight is past stopAtHeight but startHeight isn't
      if (
        startHeight <= stopSignal.stopAtHeight &&
        endHeight > stopSignal.stopAtHeight
      ) {
        this.logger.log(
          `Process last batch if endHeight is past stopAtHeight but startHeight isn't ${endHeight} > ${stopSignal.stopAtHeight}`
        );

        endHeight = stopSignal.stopAtHeight;
      }
    } catch (error: any) {
      // No stop signal. Continue..
      this.logger.log('No stop signal');
      this.logger.error(error);
    }

    /**
     * Start next batch
     */
    synchronization.startNextBatch({
      headTopologyHeight: parseInt(headInfo.head_topology.height),
      lastIrreversibleBlock: parseInt(headInfo.last_irreversible_block),
      startHeight,
      endHeight,
    });

    await this.writeRepository.save(synchronization);
  }
}
