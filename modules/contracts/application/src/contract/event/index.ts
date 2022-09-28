import { CommandBus } from '@nestjs/cqrs';
import { ContractStandardService } from '@koiner/contracts/standards';
import { CreateContractEventForNewEvent } from './create-contract-event-for-new-event';
import { CreateContractForUploadedContract } from './create-contract-for-uploaded-contract';
import { CreateContractOperationForNewOperation } from './create-contract-operation-for-new-operation';

export const ContractEventHandlers = [
  CreateContractEventForNewEvent,
  CreateContractOperationForNewOperation,

  {
    provide: CreateContractForUploadedContract,
    useFactory: (
      commandBus: CommandBus,
      contractStandardService: ContractStandardService
    ): CreateContractForUploadedContract => {
      return new CreateContractForUploadedContract(
        commandBus,
        contractStandardService
      );
    },
    inject: [CommandBus, ContractStandardService],
  },
];
