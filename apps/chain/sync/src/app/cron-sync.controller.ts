import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CommandBus } from '@nestjs/cqrs';
import { koinosConfig } from '@koinos/jsonrpc';
import * as findRemoveSync from 'find-remove';
import { StartSynchronizationBatchCommand } from '@koiner/sync/application';

@Controller()
export class CronSyncController {
  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_5_SECONDS, { name: 'cronSync' })
  async cron(): Promise<void> {
    await this.commandBus.execute(
      new StartSynchronizationBatchCommand({ chainId: koinosConfig.chainId })
    );
  }

  @Cron(CronExpression.EVERY_MINUTE, { name: 'cronCleanupCache' })
  async cleanupCache(): Promise<void> {
    const cleanupAge = process.env.JSONRPC_CACHE_CLEANUP_AGE
      ? parseInt(process.env.JSONRPC_CACHE_CLEANUP_AGE)
      : 21600;

    // Delete cached block json files older than 20 minutes
    findRemoveSync(process.env.JSONRPC_CACHE_DIR ?? '/jsonrpc', {
      age: { seconds: cleanupAge },
      extensions: '.json',
      limit: 5000,
    });
  }
}
