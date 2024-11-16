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
import { KoincityLaunchpadTokenHelper } from '@koinos/jsonrpc';

@Controller()
export class ManualSyncController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly koincityLaunchpadTokenHelper: KoincityLaunchpadTokenHelper
  ) {}

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

  @Post('/trigger-token-contract')
  async triggerTokenContract(
    @Query('secret') secret: string,
    @Body()
    input: {
      transactionId: string;
      height: number;
      timestamp: number;
    }
  ): Promise<void> {
    if (secret && koinos.syncSecret && secret === koinos.syncSecret) {
      await this.koincityLaunchpadTokenHelper.publishEvents(
        input.transactionId,
        input.height,
        input.timestamp
      );
    } else {
      throw new ForbiddenException();
    }
  }
}
