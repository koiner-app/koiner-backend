import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AmqpModule } from './amqp.module';
import { ContractsModule } from './contracts.module';
import { ContractSyncEventHandlers } from './application';
import { ContractsAmqpHandlers } from './amqp';
import { KoinosModule, RawBlocksService } from '@koinos/jsonrpc';

@Module({
  imports: [AmqpModule, CqrsModule, KoinosModule, ContractsModule],
  providers: [
    Logger,
    RawBlocksService,

    ...ContractSyncEventHandlers,
    ...ContractsAmqpHandlers,
  ],
})
export class ContractsSyncModule {}
