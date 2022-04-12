import { Controller, ForbiddenException, Get, Query } from '@nestjs/common';
import { ManualSyncService } from '@koiner/sync/application/chain/manual-sync.service';
import { koinos } from '@config';

@Controller()
export class SyncController {
  constructor(private readonly manualSyncService: ManualSyncService) {}

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
}
