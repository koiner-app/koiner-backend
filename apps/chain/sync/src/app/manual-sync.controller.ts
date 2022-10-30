import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SyncBlockSetsCommand, SyncSet } from './application';
import { koinos } from '../config';
import {
  UndoBlocksCommand,
  UndoBlocksFromCheckpointCommand,
} from '@koiner/chain/application';
import * as findRemoveSync from 'find-remove';

@Controller()
export class ManualSyncController {
  constructor(private readonly commandBus: CommandBus) {}

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

  @Post('/undo')
  async undo(
    @Query('secret') secret: string,
    @Body() input: { heights: number[] }
  ): Promise<void> {
    if (secret && koinos.syncSecret && secret === koinos.syncSecret) {
      await this.commandBus.execute(
        new UndoBlocksCommand({
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
        new UndoBlocksFromCheckpointCommand({
          checkPoint: input.checkPoint,
        })
      );
    } else {
      throw new ForbiddenException();
    }
  }

  @Post('/cleanup-cache')
  async cleanupCache(@Query('secret') secret: string): Promise<void> {
    if (secret && koinos.syncSecret && secret === koinos.syncSecret) {
      // Delete cached block json files older than 30 minutes
      findRemoveSync(process.env.JSONRPC_CACHE_DIR ?? '/jsonrpc', {
        age: { seconds: 1200 },
        extensions: '.json',
        limit: 5000,
      });
    } else {
      throw new ForbiddenException();
    }
  }
}
