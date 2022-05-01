import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { KoinosModule } from '@koinos/koinos.module';
import ContractsSyncEventHandlers from '@koiner/contracts/sync/event';
import { ContractsModule } from '@koiner/contracts/contracts.module';
import { RawBlocksService } from '@koinos/raw-blocks.service';

@Module({
  imports: [CqrsModule, ScheduleModule, KoinosModule, ContractsModule],
  providers: [
    Logger,

    // EventHandlers
    ...ContractsSyncEventHandlers,

    RawBlocksService,
  ],
})
export class ContractsSyncModule {}
