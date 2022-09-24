import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoinosModule } from '@koinos/jsonrpc';
import { ContractStandardKoilibService } from '@koiner/contracts/koilib'; // Must be imported before ContractStandardService
import { ContractStandardImReadRepository } from '@koiner/contracts/koilib';
import {
  ContractStandardReadRepository,
  ContractStandardService,
} from '@koiner/contracts/standards';
import { TokenizeModuleApplicationHandlers } from '@koiner/tokenize/application';
import {
  TokenizeModels,
  TokenizeModuleRepositories,
} from '@koiner/tokenize/typeorm';

// Register our models with typeorm
import { database } from '../config';
database.entities.push(...TokenizeModels);

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(TokenizeModels), KoinosModule],
  providers: [
    {
      provide: ContractStandardService,
      useClass: ContractStandardKoilibService,
    },
    ...TokenizeModuleApplicationHandlers,
    ...TokenizeModuleRepositories,
    {
      provide: ContractStandardReadRepository,
      useClass: ContractStandardImReadRepository,
    },
  ],
  exports: [ContractStandardService],
})
export class TokenizeModule {}
