import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CommandBus } from '@nestjs/cqrs';
import { koinosConfig } from '@koinos/jsonrpc';
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
}
