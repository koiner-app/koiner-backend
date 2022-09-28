import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AmqpModule } from './amqp.module';
import { ContractsModule } from './contracts.module';
import { ContractsAmqpHandlers } from './amqp';

@Module({
  imports: [AmqpModule, CqrsModule, ContractsModule],
  providers: [Logger, ...ContractsAmqpHandlers],
})
export class ContractsSyncModule {}
