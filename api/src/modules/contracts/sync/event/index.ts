import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RawBlocksService } from '@koinos/raw-blocks.service';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';
import { CreateContractForUploadedContract } from '@koiner/contracts/sync/event/create-contract-for-uploaded-contract';
import { CreateBlockRewardForNewBlock } from '@koiner/contracts/sync/event/create-block-reward-for-new-block';
import { CreateContractOperationForNewOperation } from './create-contract-operation-for-new-operation';
import { Provider } from 'koilib';

export default [
  {
    provide: CreateContractForUploadedContract,
    useFactory: (
      commandBus: CommandBus,
      contractStandardService: ContractStandardService,
    ): CreateContractForUploadedContract => {
      const eventHandler = new CreateContractForUploadedContract(
        commandBus,
        contractStandardService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, ContractStandardService],
  },

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
];
