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
          name: 'koiner.chain.sync',
        },
      ],
      channels: {
        'koiner.chain.sync_channel': {
          // PrefetchCount = 1 will make sure max 1 event can be handled at once,
          // thus making handling chain events synchronously.
          prefetchCount: 1,
          default: true,
        },
      },
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
    ContractsModule,
  ],
  providers: [Logger, RawBlocksService, ...ContractsSyncEventHandlers],
})
export class ContractsSyncModule {}
