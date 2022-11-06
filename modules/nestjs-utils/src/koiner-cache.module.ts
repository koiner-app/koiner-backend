import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, CacheStore, Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { redisStore } from 'cache-manager-redis-store';
import { KeepRedisAliveController } from './keep-redis-alive.controller';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) =>
        (await redisStore({
          socket: {
            host: config.get('REDIS_HOST'),
            port: +config.get('REDIS_PORT_NUMBER'),
            tls: true,
          },

          username: config.get('REDIS_USERNAME'),
          password: config.get('REDIS_PASSWORD'),
          ttl: config.get('CACHE_TTL') ?? 86400, // 1 day
        })) as unknown as CacheStore,
      inject: [ConfigService],
    }),
  ],
  controllers: [KeepRedisAliveController],
  exports: [CacheModule],
})
export class KoinerCacheModule {}
