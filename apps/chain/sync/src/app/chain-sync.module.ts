import { Logger, Module } from '@nestjs/common';
import { AmqpModule } from './amqp.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { KoinosModule, RawBlocksService } from '@koinos/jsonrpc';
import { ManualSyncService } from './manual-sync.service';
import { ChainSyncApplicationHandlers } from './application';
import { ChainAmqpHandlers } from './amqp';
import { ManualSyncController } from './manual-sync.controller';
import { InitSyncController } from './init-sync.controller';

const InitSyncControllerWrapper = [];

// Deactivate initial sync be updating INIT_SYNC
if (process.env.INIT_SYNC === 'active') {
  InitSyncControllerWrapper.push(InitSyncController);
}

@Module({
  imports: [AmqpModule, CqrsModule, ScheduleModule, KoinosModule],
  providers: [
    Logger,
    RawBlocksService,
    ManualSyncService,
    ...ChainSyncApplicationHandlers,
    ...ChainAmqpHandlers,
  ],
  controllers: [...InitSyncControllerWrapper, ManualSyncController],
})
export class ChainSyncModule {}
