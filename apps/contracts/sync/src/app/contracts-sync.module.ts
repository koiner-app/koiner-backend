import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KoinosModule, RawBlocksService } from '@koinos/jsonrpc';
import { AmqpModule } from './amqp.module';
import { ContractsModule } from './contracts.module';
import { ContractsSyncEventHandlers } from './event';
import { ContractsAmqpHandlers } from './amqp';

@Module({
  imports: [AmqpModule, CqrsModule, KoinosModule, ContractsModule],
  providers: [
    Logger,
    RawBlocksService,
    ...ContractsSyncEventHandlers,
    ...ContractsAmqpHandlers,
  ],
})
export class ContractsSyncModule {}
