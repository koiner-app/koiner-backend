import { Controller, ForbiddenException, Get, Query } from '@nestjs/common';
import { SyncService } from './sync.service';
import { koinos } from '../config';

@Controller()
export class ManualSyncController {
  constructor(private readonly syncService: SyncService) {}

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
}
