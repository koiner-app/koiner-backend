import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SyncService } from './sync.service';
import * as findRemoveSync from 'find-remove';

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

  @Cron(CronExpression.EVERY_MINUTE, { name: 'cronCleanupCache' })
  async cleanupCache(): Promise<void> {
    // Delete cached block json files older than 20 minutes
    findRemoveSync(process.env.JSONRPC_CACHE_DIR ?? '/jsonrpc', {
      age: { seconds: 1200 },
      extensions: '.json',
      limit: 5000,
    });
  }
}
