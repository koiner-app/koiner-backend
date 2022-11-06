import { CACHE_MANAGER, Controller, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Cache } from 'cache-manager';

@Controller()
export class KeepRedisAliveController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  @Cron(CronExpression.EVERY_MINUTE, { name: 'keepRedisAlive' })
  async keepRedisAlive(): Promise<void> {
    const keepRedisAlive = await this.cacheManager.get(`keepRedisAlive`);

    if (!keepRedisAlive) {
      await this.cacheManager.set(`keepRedisAlive`, true, 120);
    }
  }
}
