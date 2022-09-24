import { CommandBus } from '@nestjs/cqrs';
import { ContractStandardService } from '@koiner/contracts/standards';
import { CreateTokenContractOnContractCreated } from './create-token-contract-on-contract-created';
import { UpdateTokenSupplyOnTokensMinted } from './update-token-supply-on-tokens-minted';
import { UpdateTokenSupplyOnTokensBurned } from './update-token-supply-on-tokens-burned';

export const TokenContractEventHandlers = [
  // TokenContract.totalSupply
  UpdateTokenSupplyOnTokensMinted,
  UpdateTokenSupplyOnTokensBurned,

  // TokenContract
  {
    provide: CreateTokenContractOnContractCreated,
    useFactory: (
      commandBus: CommandBus,
      contractStandardService: ContractStandardService
    ): CreateTokenContractOnContractCreated => {
      return new CreateTokenContractOnContractCreated(
        commandBus,
        contractStandardService
      );
    },
    inject: [CommandBus, ContractStandardService],
  },
];
