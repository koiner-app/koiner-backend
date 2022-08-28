import { CreateContractHandler } from './create-contract.handler';
import { CreateContractEventHandler } from './create-contract-event.handler';

export { CreateContractCommand } from './dto/create-contract.command';
export { CreateContractEventCommand } from './dto/create-contract-event.command';

export const ContractCommandHandlers = [
  CreateContractHandler,
  CreateContractEventHandler,
];
