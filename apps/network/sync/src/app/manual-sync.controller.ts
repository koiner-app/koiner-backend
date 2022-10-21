import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { SyncService } from './sync.service';
import { koinos } from '../config';
import { CommandBus } from '@nestjs/cqrs';
import {
  UndoBlockRewardsCommand,
  UndoBlockRewardsFromCheckpointCommand,
} from '@koiner/network/application';

@Controller()
export class ManualSyncController {
  constructor(
    private readonly syncService: SyncService,
    private readonly commandBus: CommandBus
  ) {}

  @Get('/sync')
  async sync(
    @Query('secret') secret: string,
    @Query('batchSize') batchSize?: number
  ): Promise<void> {
    if (secret && koinos.syncSecret && secret === koinos.syncSecret) {
      await this.syncService.sync(batchSize);
    } else {
      throw new ForbiddenException();
    }
  }

  @Post('/undo')
  async undo(
    @Query('secret') secret: string,
    @Body() input: { heights: number[] }
  ): Promise<void> {
    if (secret && koinos.syncSecret && secret === koinos.syncSecret) {
      await this.commandBus.execute(
        new UndoBlockRewardsCommand({
          blockHeights: input.heights,
        })
      );
    } else {
      throw new ForbiddenException();
    }
  }

  @Post('/reset')
  async reset(
    @Query('secret') secret: string,
    @Body() input: { checkPoint: number }
  ): Promise<void> {
    if (secret && koinos.syncSecret && secret === koinos.syncSecret) {
      await this.commandBus.execute(
        new UndoBlockRewardsFromCheckpointCommand({
          checkPoint: input.checkPoint,
        })
      );
    } else {
      throw new ForbiddenException();
    }
  }
}
