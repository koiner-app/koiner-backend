import { Global, Module } from '@nestjs/common';
import { Logger } from '@appvise/domain';
import { NestLogger } from './nest-logger';
import { HealthController } from './health.controller';

@Global()
@Module({
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
