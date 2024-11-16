import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  BlocksServiceModule,
  KoincityLaunchpadTokenHelper,
} from '@koinos/jsonrpc';
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
    BlocksServiceModule,
    KoinerLoggerModule,
    LoggerModule,
    ContractsModule,
  ],
  providers: [
    ...ContractSyncEventHandlers,
    ...ContractsAmqpHandlers,
    KoincityLaunchpadTokenHelper,
  ],
})
export class ContractsSyncModule {}
