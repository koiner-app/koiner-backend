import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { KoinosModule, RawBlocksService } from '@koinos/jsonrpc';
import { ContractsModule } from './contracts.module';
import { ContractsSyncEventHandlers } from './event';

@Module({
  imports: [
    CqrsModule,
    KoinosModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'koinos.event',
          type: 'topic',
        },
      ],
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
    ContractsModule,
  ],
  providers: [
    Logger,

    // EventHandlers
    ...ContractsSyncEventHandlers,

    RawBlocksService,
  ],
})
export class ContractsSyncModule {}
