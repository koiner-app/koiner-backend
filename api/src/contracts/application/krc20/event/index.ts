import { CreateKrcContractOnContractCreated } from './create-krc-contract-on-contract-created';
import { CreateKrcOperationOnOperationCreated } from './create-krc-operation-on-operation-created';
import { UpdateKrc20BalanceOnBlockRewardCreated } from './update-krc20-balance-on-block-reward-created';
import { UpdateKrc20BalancesOnOperationCreated } from './update-krc20-balances-on-operation-created';
import { UpdateHolderCountOnKrc20BalanceCreated } from './update-holder-count-on-krc20-balance-created';
import { UpdateHolderCountOnKrc20BalanceUpdated } from './update-holder-count-on-krc20-balance-updated';
import { UpdateKrc20ContractStatsOnKrc20OperationCreated } from './update-krc20-contract-stats-on-krc20-operation-created';
import { UpdateTotalSupplyOnBlockRewardCreated } from './update-total-supply-on-block-reward-created';
import { UpdateTotalSupplyOnKrc20TokensMinted } from './update-total-supply-on-krc20-tokens-minted';
import { provideEventHandlers } from '@appvise/nestjs-utils';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Logger } from '@appvise/domain';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';

export default [
  ...provideEventHandlers([
    UpdateKrc20BalanceOnBlockRewardCreated,
    UpdateKrc20BalancesOnOperationCreated,

    UpdateHolderCountOnKrc20BalanceCreated,
    UpdateHolderCountOnKrc20BalanceUpdated,
    UpdateKrc20ContractStatsOnKrc20OperationCreated,

    UpdateTotalSupplyOnBlockRewardCreated,
    UpdateTotalSupplyOnKrc20TokensMinted,
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
