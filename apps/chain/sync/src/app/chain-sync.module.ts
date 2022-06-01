import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { KoinosModule, RawBlocksService } from '@koinos/jsonrpc';
import { ChainSyncApplicationHandlers } from './application';
import { BlockAcceptedHandler } from './event/block-accepted.handler';
import { SyncController } from './sync.controller';
import { ManualSyncService } from './manual-sync.service';
import ChainSyncEventHandlers from './event';

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
      ],
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
  ],
  providers: [
    Logger,

    // Application
    ...ChainSyncApplicationHandlers,

    // EventHandlers
    BlockAcceptedHandler,
    ...ChainSyncEventHandlers,

    RawBlocksService,
    ManualSyncService,
  ],
  controllers: [SyncController],
})
export class ChainSyncModule {}
