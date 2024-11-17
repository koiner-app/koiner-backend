import { CreateContractHandler } from './create-contract.handler';
import { CreateContractEventHandler } from './create-contract-event.handler';
import { CreateContractOperationHandler } from './create-contract-operation.handler';
import { UpdateContractHandler } from './update-contract-standard.handler';

export { CreateContractCommand } from './dto/create-contract.command';
export { CreateContractEventCommand } from './dto/create-contract-event.command';
export { CreateContractOperationCommand } from './dto/create-contract-operation.command';
export { UpdateContractStandardCommand } from './dto/update-contract-standard.command';

export const ContractCommandHandlers = [
  CreateContractHandler,
  CreateContractEventHandler,
  CreateContractOperationHandler,
  UpdateContractHandler,
];
