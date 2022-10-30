import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

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
})
export class KoinerLoggerModule {}
