import { Logger, Module } from '@nestjs/common';
import { AmqpModule } from './amqp.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { KoinosModule, RawBlocksService } from '@koinos/jsonrpc';
import { ManualSyncService } from './manual-sync.service';
import { PubSubEngineProvider } from './pubsub-engine-provider';
import { ChainSyncApplicationHandlers } from './application';
import { ChainAmqpHandlers } from './amqp';
import { SyncController } from './sync.controller';

@Module({
  imports: [AmqpModule, CqrsModule, ScheduleModule, KoinosModule],
  providers: [
    Logger,
    RawBlocksService,
    ManualSyncService,
    PubSubEngineProvider,
    ...ChainSyncApplicationHandlers,
    ...ChainAmqpHandlers,
  ],
  controllers: [SyncController],
})
export class ChainSyncModule {}
