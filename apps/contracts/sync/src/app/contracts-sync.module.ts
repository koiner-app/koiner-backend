import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KoinosModule, RawBlocksService } from '@koinos/jsonrpc';
import { AmqpModule } from './amqp.module';
import { KoinerLoggerModule } from '@koiner/logger/nestjs';
import { LoggerModule } from './logger.module';
import { ContractsModule } from './contracts.module';
import { ContractSyncEventHandlers } from './application';
import { ContractsAmqpHandlers } from './amqp';

@Module({
  imports: [
    AmqpModule,
    CqrsModule,
    KoinosModule,
    KoinerLoggerModule,
    LoggerModule,
    ContractsModule,
  ],
  providers: [
    RawBlocksService,

    ...ContractSyncEventHandlers,
    ...ContractsAmqpHandlers,
  ],
})
export class ContractsSyncModule {}
