import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, CacheStore, Global, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const store = (await redisStore({
          socket: {
            host: config.get('REDIS_HOST'),
            port: +config.get('REDIS_PORT_NUMBER'),
          },
          password: config.get('REDIS_PASSWORD'),
        })) as unknown as CacheStore;

        return {
          store,
          ttl: config.get('CACHE_TTL') ?? 86400, // 1 day
          max: config.get('CACHE_MAX') ?? 25000, // maximum number of items in cache
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class KoinerCacheModule {}
