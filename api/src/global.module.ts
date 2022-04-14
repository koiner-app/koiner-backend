import { Global, Module } from '@nestjs/common';
import { Logger } from '@appvise/domain';
import { NestLogger } from '@appvise/nestjs-utils';

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
})
export class GlobalModule {}
