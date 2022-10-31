import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventLogger } from '@koiner/logger/domain';
import { KoinerLoggerModuleApplicationHandlers } from '@koiner/logger/application';
import {
  KoinerLoggerModuleModels,
  KoinerLoggerModuleRepositories,
} from '@koiner/logger/typeorm';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(KoinerLoggerModuleModels)],
  providers: [
    ...KoinerLoggerModuleApplicationHandlers,
    ...KoinerLoggerModuleRepositories,
  ],
  exports: [EventLogger],
})
export class KoinerLoggerModule {}
