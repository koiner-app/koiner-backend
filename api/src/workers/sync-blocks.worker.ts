import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Provider } from 'koilib';
import { SyncBlocksCommand } from '@koiner/workers/application/chain/command';

@Injectable()
export class SyncBlocksWorker {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
  ) {}

  private readonly logger = new Logger(SyncBlocksWorker.name);

  // @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('Called every 10 seconds');

    const blockNumber = 95804;
    const MAX_NB_BLOCKS_TO_FETCH = 10000;
    let nbBlockToFetch = MAX_NB_BLOCKS_TO_FETCH;

    const headInfo = await this.provider.getHeadInfo();

    console.log(headInfo);

    const currentHeight = parseInt(headInfo.head_topology.height);

    let lastBlockNumber = blockNumber + nbBlockToFetch - 1;
    console.log(
      'lastBlockNumber > currentHeight',
      lastBlockNumber,
      currentHeight,
    );
    if (lastBlockNumber > currentHeight) {
      lastBlockNumber = currentHeight;
      nbBlockToFetch = lastBlockNumber - blockNumber;
      console.log('nbBlockToFetch = ', nbBlockToFetch);

      if (nbBlockToFetch > MAX_NB_BLOCKS_TO_FETCH) {
        nbBlockToFetch = MAX_NB_BLOCKS_TO_FETCH;
      }
    }
    console.log(
      `processing . block ${blockNumber} through ${lastBlockNumber} (currentHeight: ${currentHeight}, lastIrreversible: ${headInfo.last_irreversible_block}, nbBlockToFetch: ${nbBlockToFetch})`,
    );

    await this.commandBus.execute(new SyncBlocksCommand(900000, 10000));

    console.log('Done');
  }
}
