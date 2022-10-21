import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SyncService } from './sync.service';

@Controller()
export class CronSyncController {
  constructor(private readonly syncService: SyncService) {}

  @Cron(CronExpression.EVERY_5_SECONDS, { name: 'cronSync' })
  async cron(): Promise<void> {
    await this.syncService.sync(
      process.env.CRON_SYNC_BATCH_SIZE
        ? parseInt(process.env.CRON_SYNC_BATCH_SIZE)
        : 100
    );
  }
}
