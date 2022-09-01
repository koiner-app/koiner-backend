import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ManualSyncService } from './manual-sync.service';
import { SyncBlockSetsCommand, SyncSet } from './application';
import { koinos } from '../config';

@Controller()
export class ManualSyncController {
  constructor(
    private readonly manualSyncService: ManualSyncService,
    private readonly commandBus: CommandBus
  ) {}

  @Get('/sync')
  async sync(
    @Query('secret') secret: string,
    @Query('batchSize') batchSize?: number
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
    @Body() input: { sets: SyncSet[] }
  ): Promise<void> {
    if (secret && koinos.syncSecret && secret === koinos.syncSecret) {
      await this.commandBus.execute(
        new SyncBlockSetsCommand({
          sets: input.sets,
        })
      );
    } else {
      throw new ForbiddenException();
    }
  }
}
