import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { KoinosModule } from '@koiner/koinos.module';
import SyncApplication from '@koiner/sync/application';
import { ContractsModule } from '@koiner/contracts/contracts.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { BlockAcceptedHandler } from '@koiner/sync/event/block-accepted.handler';
import { SyncController } from '@koiner/sync/sync.controller';
import { ManualSyncService } from '@koiner/sync/application/chain/manual-sync.service';
import { RawBlocksService } from '@koiner/sync/raw-blocks.service';

@Module({
  imports: [
    CqrsModule,
    ScheduleModule,
    KoinosModule,
    ContractsModule,
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
    ...SyncApplication,

    // EventHandlers
    BlockAcceptedHandler,

    RawBlocksService,
    ManualSyncService,
  ],
  controllers: [SyncController],
})
export class SyncModule {}
