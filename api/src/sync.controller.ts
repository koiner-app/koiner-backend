import { Controller, Get } from '@nestjs/common';
import { SyncBlocksWorker } from '@koiner/workers/sync-blocks.worker';

@Controller()
export class SyncController {
  constructor(private readonly worker: SyncBlocksWorker) {}

  @Get('/sync')
  async sync(): Promise<void> {
    await this.worker.sync();
  }
}
