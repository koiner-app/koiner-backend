import { CreateTokenContractOnContractCreated } from './create-token-contract-on-contract-created';
import { CreateTokenEventOnContractEventCreated } from './create-token-event-on-contract-event-created';
import { CreateTokenOperationOnOperationCreated } from './create-token-operation-on-operation-created';
import { UpdateTokenBalanceOnBlockRewardCreated } from './update-token-balance-on-block-reward-created';
import { UpdateTokenBalancesOnOperationCreated } from './update-token-balances-on-operation-created';
import { UpdateTokenContractOnTokenBalanceCreated } from './update-token-contract-on-token-balance-created';
import { UpdateTokenContractOnTokenBalanceUpdated } from './update-token-contract-on-token-balance-updated';
import { provideEventHandlers } from '@koiner/nestjs-utils';
import { CommandBus } from '@nestjs/cqrs';
import { Logger } from '@appvise/domain';
import { ContractStandardService } from '../../contract-standard/service/contract-standard-service';

export const TokenEventHandlers = [
  ...provideEventHandlers([
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
      contractStandardService: ContractStandardService
    ): CreateTokenContractOnContractCreated => {
      const eventHandler = new CreateTokenContractOnContractCreated(
        commandBus,
        logger,
        contractStandardService
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, Logger, ContractStandardService],
  },

  {
    provide: CreateTokenEventOnContractEventCreated,
    useFactory: (
      commandBus: CommandBus,
      contractStandardService: ContractStandardService
    ): CreateTokenEventOnContractEventCreated => {
      const eventHandler = new CreateTokenEventOnContractEventCreated(
        commandBus,
        contractStandardService
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, ContractStandardService],
  },

  {
    provide: CreateTokenOperationOnOperationCreated,
    useFactory: (
      commandBus: CommandBus,
      contractStandardService: ContractStandardService
    ): CreateTokenOperationOnOperationCreated => {
      const eventHandler = new CreateTokenOperationOnOperationCreated(
        commandBus,
        contractStandardService
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, ContractStandardService],
  },
];
