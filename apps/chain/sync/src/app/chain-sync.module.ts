import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { KoinosModule, RawBlocksService } from '@koinos/jsonrpc';
import { ManualSyncService } from './manual-sync.service';
import { ChainSyncApplicationHandlers } from './application';
import { ChainAmqpHandlers } from './amqp';
import { SyncController } from './sync.controller';

@Module({
  imports: [
    CqrsModule,
    ScheduleModule,
    KoinosModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'koinos.event',
          type: 'topic',
        },
        {
          name: 'koiner.chain.sync',
          type: 'topic',
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
  ],
  providers: [
    Logger,
    RawBlocksService,
    ManualSyncService,

    ...ChainSyncApplicationHandlers,
    ...ChainAmqpHandlers,
  ],
  controllers: [SyncController],
})
export class ChainSyncModule {}
