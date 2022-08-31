import { CreateTokenContractOnContractCreated } from './create-token-contract-on-contract-created';
import { CreateTokenEventOnContractEventCreated } from './create-token-event-on-contract-event-created';
import { CreateTokenOperationOnOperationCreated } from './create-token-operation-on-operation-created';
import { UpdateTokenHolderOnTokensBurned } from './update-token-holder-on-tokens-burned';
import { UpdateTokenHolderOnTokensMinted } from './update-token-holder-on-tokens-minted';
import { UpdateTokenHoldersOnTokensTransfered } from './update-token-holders-on-tokens-transfered';
import { UpdateTokenSupplyOnTokensMinted } from './update-token-supply-on-tokens-minted';
import { UpdateTokenSupplyOnTokensBurned } from './update-token-supply-on-tokens-burned';
import { provideEventHandlers } from '@koiner/nestjs-utils';
import { CommandBus } from '@nestjs/cqrs';
import { Logger } from '@appvise/domain';
import { ContractStandardService } from '../../contract-standard/service/contract-standard-service';

export const TokenEventHandlers = [
  ...provideEventHandlers([
    UpdateTokenHolderOnTokensBurned,
    UpdateTokenHolderOnTokensMinted,
    UpdateTokenHoldersOnTokensTransfered,

    UpdateTokenSupplyOnTokensMinted,
    UpdateTokenSupplyOnTokensBurned,
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
