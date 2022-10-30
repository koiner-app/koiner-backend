import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as findRemoveSync from 'find-remove';
import { StartSynchronizationBatchCommand } from '@koiner/sync/application';
import { CommandBus } from '@nestjs/cqrs';

@Controller()
export class CronSyncController {
  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_5_SECONDS, { name: 'cronSync' })
  async cron(): Promise<void> {
    await this.commandBus.execute(new StartSynchronizationBatchCommand());
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
