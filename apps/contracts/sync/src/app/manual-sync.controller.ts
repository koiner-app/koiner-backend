import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Query,
} from '@nestjs/common';
import { koinos } from '../config';
import { KoincityLaunchpadTokenHelper } from '@koinos/jsonrpc';

@Controller()
export class ManualSyncController {
  constructor(
    private readonly koincityLaunchpadTokenHelper: KoincityLaunchpadTokenHelper
  ) {}

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
        input.timestamp,
        true
      );
    } else {
      throw new ForbiddenException();
    }
  }
}
