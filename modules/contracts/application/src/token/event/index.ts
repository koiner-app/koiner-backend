import { CreateTokenContractOnContractCreated } from './create-token-contract-on-contract-created';
import { CreateTokenEventOnContractEventCreated } from './create-token-event-on-contract-event-created';
import { CreateTokenOperationOnOperationCreated } from './create-token-operation-on-operation-created';
import { UpdateTokenHolderOnTokensBurned } from './update-token-holder-on-tokens-burned';
import { UpdateTokenHolderOnTokensMinted } from './update-token-holder-on-tokens-minted';
import { UpdateTokenHoldersOnTokensTransferred } from './update-token-holders-on-tokens-transferred';
import { UpdateTokenSupplyOnTokensMinted } from './update-token-supply-on-tokens-minted';
import { UpdateTokenSupplyOnTokensBurned } from './update-token-supply-on-tokens-burned';
import { CommandBus } from '@nestjs/cqrs';
import { Logger } from '@appvise/domain';
import { ContractStandardService } from '../../contract-standard/service/contract-standard-service';

export const TokenEventHandlers = [
  // TokenHolder
  UpdateTokenHolderOnTokensBurned,
  UpdateTokenHolderOnTokensMinted,
  UpdateTokenHoldersOnTokensTransferred,

  // TokenContract.totalSupply
  UpdateTokenSupplyOnTokensMinted,
  UpdateTokenSupplyOnTokensBurned,

  // TokenContract
  {
    provide: CreateTokenContractOnContractCreated,
    useFactory: (
      commandBus: CommandBus,
      logger: Logger,
      contractStandardService: ContractStandardService
    ): CreateTokenContractOnContractCreated => {
      return new CreateTokenContractOnContractCreated(
        commandBus,
        logger,
        contractStandardService
      );
    },
    inject: [CommandBus, Logger, ContractStandardService],
  },

  {
    provide: CreateTokenEventOnContractEventCreated,
    useFactory: (
      commandBus: CommandBus,
      contractStandardService: ContractStandardService
    ): CreateTokenEventOnContractEventCreated => {
      return new CreateTokenEventOnContractEventCreated(
        commandBus,
        contractStandardService
      );
    },
    inject: [CommandBus, ContractStandardService],
  },

  {
    provide: CreateTokenOperationOnOperationCreated,
    useFactory: (
      commandBus: CommandBus,
      contractStandardService: ContractStandardService
    ): CreateTokenOperationOnOperationCreated => {
      return new CreateTokenOperationOnOperationCreated(
        commandBus,
        contractStandardService
      );
    },
    inject: [CommandBus, ContractStandardService],
  },
];
