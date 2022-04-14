import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { provideEventHandler } from '@appvise/nestjs-utils';
import { RawBlocksService } from '@koiner/sync/raw-blocks.service';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';
import { CreateContractOperationForNewOperation } from './operation/create-contract-operation-for-new-operation';
import { CreateSystemCallOperationForNewOperation } from './operation/create-system-call-operation-for-new-operation';
import { CreateSystemContractOperationForNewOperation } from './operation/create-system-contract-operation-for-new-operation';
import { CreateUploadOperationForNewOperation } from './operation/create-upload-operation-for-new-operation';
import { SyncTransactionsForNewBlock } from './sync-transactions-for-new-block';
import { CreateBlockRewardForNewBlock } from '@koiner/sync/application/chain/event/create-block-reward-for-new-block';
import { Provider } from 'koilib';
import { SyncOperationsForNewTransaction } from '@koiner/sync/application/chain/event/sync-operations-for-new-transaction';

export default [
  // TODO: Move to contracts. Must be here because of import order / prio
  {
    provide: CreateBlockRewardForNewBlock,
    useFactory: (
      commandBus: CommandBus,
      provider: Provider,
      rawBlocksService: RawBlocksService,
      contractStandardService: ContractStandardService,
    ): CreateBlockRewardForNewBlock => {
      const eventHandler = new CreateBlockRewardForNewBlock(
        commandBus,
        provider,
        rawBlocksService,
        contractStandardService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, Provider, RawBlocksService, ContractStandardService],
  },

  provideEventHandler(SyncTransactionsForNewBlock),

  {
    provide: SyncOperationsForNewTransaction,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService,
    ): SyncOperationsForNewTransaction => {
      const eventHandler = new SyncOperationsForNewTransaction(
        commandBus,
        rawBlocksService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },

  {
    provide: CreateContractOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus,
      queryBus: QueryBus,
      rawBlocksService: RawBlocksService,
    ): CreateContractOperationForNewOperation => {
      const eventHandler = new CreateContractOperationForNewOperation(
        commandBus,
        queryBus,
        rawBlocksService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, QueryBus, RawBlocksService],
  },

  {
    provide: CreateSystemCallOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService,
    ): CreateSystemCallOperationForNewOperation => {
      const eventHandler = new CreateSystemCallOperationForNewOperation(
        commandBus,
        rawBlocksService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },

  {
    provide: CreateSystemContractOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService,
    ): CreateSystemContractOperationForNewOperation => {
      const eventHandler = new CreateSystemContractOperationForNewOperation(
        commandBus,
        rawBlocksService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },

  {
    provide: CreateUploadOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService,
      contractStandardService: ContractStandardService,
    ): CreateUploadOperationForNewOperation => {
      const eventHandler = new CreateUploadOperationForNewOperation(
        commandBus,
        rawBlocksService,
        contractStandardService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService, ContractStandardService],
  },
];
