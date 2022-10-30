import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  UndoBlockRewardsCommand,
  UndoBlockRewardsFromCheckpointCommand,
} from '@koiner/network/application';
import { koinos } from '../config';

@Controller()
export class ManualSyncController {
  constructor(private readonly commandBus: CommandBus) {}

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
