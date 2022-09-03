import { Controller } from '@nestjs/common';
import { ManualSyncService } from './manual-sync.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller()
export class InitSyncController {
  constructor(private readonly manualSyncService: ManualSyncService) {}

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'initSync' })
  /**
   * Initial sync with koinos-chain by using cron job.
   * After initial sync the BlockAcceptedEvent listener will be used.
   * BlockAcceptedEvents will only be used after koinos-chain has completed initial sync.
   */
  async cron(): Promise<void> {
    console.log('CRON CALLED');
    await this.manualSyncService.sync(
      process.env.INIT_SYNC_BATCH_SIZE
        ? parseInt(process.env.INIT_SYNC_BATCH_SIZE)
        : 1000
    );
  }
}
