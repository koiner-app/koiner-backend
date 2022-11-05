import { Global, Module } from '@nestjs/common';
import { Logger } from '@appvise/domain';
import { NestLogger } from './nest-logger';
import { HealthController } from './health.controller';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    NestLogger,
    {
      provide: Logger,
      useClass: NestLogger,
    },
  ],
  exports: [Logger, NestLogger],
  controllers: [HealthController],
})
export class GlobalAppModule {}
