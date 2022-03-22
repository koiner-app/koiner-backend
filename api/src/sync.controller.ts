import { Controller, Get } from '@nestjs/common';
import { SyncBlocksWorker } from '@koiner/workers/sync-blocks.worker';

@Controller()
export class SyncController {
  constructor(private readonly worker: SyncBlocksWorker) {}

  @Get('/sync')
  async sync(): Promise<void> {
    await this.worker.sync();
  }

  @Get('/sync10')
  async sync10(): Promise<void> {
    setTimeout(async () => {
      await this.worker.sync();
    }, 10000);
  }

  @Get('/sync20')
  async sync20(): Promise<void> {
    setTimeout(async () => {
      await this.worker.sync();
    }, 20000);
  }

  @Get('/sync30')
  async sync30(): Promise<void> {
    setTimeout(async () => {
      await this.worker.sync();
    }, 30000);
  }

  @Get('/sync40')
  async sync40(): Promise<void> {
    setTimeout(async () => {
      await this.worker.sync();
    }, 40000);
  }

  @Get('/sync50')
  async sync50(): Promise<void> {
    setTimeout(async () => {
      await this.worker.sync();
    }, 50000);
  }
}
