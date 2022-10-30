import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { KoinerLoggerModule } from '@koiner/logger/nestjs';

import { SyncModuleLoggerAutomations } from './sync';

@Module({
  imports: [CqrsModule, KoinerLoggerModule],
  providers: [...SyncModuleLoggerAutomations],
})
export class SyncLoggerModule {}
