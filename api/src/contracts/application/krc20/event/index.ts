import { CreateKrcContractOnContractCreated } from './create-krc-contract-on-contract-created';
import { CreateKrcOperationOnOperationCreated } from './create-krc-operation-on-operation-created';
import { UpdateBlockRewardBalanceOnBlockRewardCreated } from './update-block-reward-balance-on-block-reward-created';
import { UpdateKrc20BalancesOnOperationCreated } from './update-krc20-balances-on-operation-created';
import { UpdateKrc20ContractOnKrc20BalanceCreated } from './update-krc20-contract-on-krc20-balance-created';
import { provideEventHandlers } from '@appvise/nestjs-utils';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Logger } from '@appvise/domain';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';
import { UpdateKrc20ContractOnKrc20BalanceUpdated } from '@koiner/contracts/application/krc20/event/update-krc20-contract-on-krc20-balance-updated';

export default [
  ...provideEventHandlers([
    UpdateBlockRewardBalanceOnBlockRewardCreated,
    UpdateKrc20BalancesOnOperationCreated,
    UpdateKrc20ContractOnKrc20BalanceCreated,
    UpdateKrc20ContractOnKrc20BalanceUpdated,
  ]),

  {
    provide: CreateKrcContractOnContractCreated,
    useFactory: (
      commandBus: CommandBus,
      logger: Logger,
      contractStandardService: ContractStandardService,
    ): CreateKrcContractOnContractCreated => {
      const eventHandler = new CreateKrcContractOnContractCreated(
        commandBus,
        logger,
        contractStandardService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, Logger, ContractStandardService],
  },

  {
    provide: CreateKrcOperationOnOperationCreated,
    useFactory: (
      commandBus: CommandBus,
      queryBus: QueryBus,
      contractStandardService: ContractStandardService,
    ): CreateKrcOperationOnOperationCreated => {
      const eventHandler = new CreateKrcOperationOnOperationCreated(
        commandBus,
        queryBus,
        contractStandardService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, QueryBus, ContractStandardService],
  },
];
