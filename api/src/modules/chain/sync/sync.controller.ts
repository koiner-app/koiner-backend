import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ManualSyncService } from '@koiner/chain/sync/manual-sync.service';
import { koinos } from '@config';
import { SyncBlockSetsCommand, SyncSet } from '@koiner/chain/sync/application';
import { CommandBus } from '@nestjs/cqrs';

@Controller()
export class SyncController {
  constructor(
    private readonly manualSyncService: ManualSyncService,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/sync')
  async sync(
    @Query('secret') secret: string,
    @Query('batchSize') batchSize?: number,
  ): Promise<void> {
    if (secret && koinos.syncSecret && secret === koinos.syncSecret) {
      await this.manualSyncService.sync(batchSize);
    } else {
      throw new ForbiddenException();
    }
  }

  @Post('/sync-set')
  async syncSet(
    @Query('secret') secret: string,
    @Body() input: { sets: SyncSet[] },
  ): Promise<void> {
    if (secret && koinos.syncSecret && secret === koinos.syncSecret) {
      console.log(input.sets);
      await this.commandBus.execute(
        new SyncBlockSetsCommand({
          sets: input.sets,
        }),
      );
    } else {
      throw new ForbiddenException();
    }
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  async cron(): Promise<void> {
    await this.manualSyncService.sync(500);
  }
}
