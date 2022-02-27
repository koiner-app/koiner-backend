import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SyncBlocksWorker } from '@koiner/workers/sync-blocks.worker';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly worker: SyncBlocksWorker,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    await this.worker.handleCron();
    return this.appService.getHello();
  }
}
