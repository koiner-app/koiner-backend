import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoinerLoggerModuleModels } from '@koiner/logger/typeorm';
import { KoinerLoggerModule } from '@koiner/logger/nestjs';
import { KoinerLoggerModuleGraphQLServices } from '@koiner/logger/graphql';

// Register our models with typeorm
import { database } from '../config';
database.entities.push(...KoinerLoggerModuleModels);

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(KoinerLoggerModuleModels),
    KoinerLoggerModule,
  ],
  providers: [...KoinerLoggerModuleGraphQLServices],
})
export class LoggerModule {}
