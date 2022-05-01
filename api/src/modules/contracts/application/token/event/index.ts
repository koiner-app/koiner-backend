import { CreateTokenContractOnContractCreated } from './create-token-contract-on-contract-created';
import { CreateTokenOperationOnOperationCreated } from './create-token-operation-on-operation-created';
import { UpdateBlockRewardBalanceOnBlockRewardCreated } from './update-block-reward-balance-on-block-reward-created';
import { UpdateTokenBalanceOnBlockRewardCreated } from './update-token-balance-on-block-reward-created';
import { UpdateTokenBalancesOnOperationCreated } from './update-token-balances-on-operation-created';
import { UpdateTokenContractOnTokenBalanceCreated } from './update-token-contract-on-token-balance-created';
import { UpdateTokenContractOnTokenBalanceUpdated } from './update-token-contract-on-token-balance-updated';
import { provideEventHandlers } from '@appvise/nestjs-utils';
import { CommandBus } from '@nestjs/cqrs';
import { Logger } from '@appvise/domain';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';

export default [
  ...provideEventHandlers([
    UpdateBlockRewardBalanceOnBlockRewardCreated,
    UpdateTokenBalanceOnBlockRewardCreated,
    UpdateTokenBalancesOnOperationCreated,
    UpdateTokenContractOnTokenBalanceCreated,
    UpdateTokenContractOnTokenBalanceUpdated,
  ]),

  {
    provide: CreateTokenContractOnContractCreated,
    useFactory: (
      commandBus: CommandBus,
      logger: Logger,
      contractStandardService: ContractStandardService,
    ): CreateTokenContractOnContractCreated => {
      const eventHandler = new CreateTokenContractOnContractCreated(
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
    provide: CreateTokenOperationOnOperationCreated,
    useFactory: (
      commandBus: CommandBus,
      contractStandardService: ContractStandardService,
    ): CreateTokenOperationOnOperationCreated => {
      const eventHandler = new CreateTokenOperationOnOperationCreated(
        commandBus,
        contractStandardService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, ContractStandardService],
  },
];
