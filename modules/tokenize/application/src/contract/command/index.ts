import { CreateTokenContractHandler } from './create-token-contract.handler';
import { UpdateTokenContractHandler } from './update-token-contract.handler';

export { CreateTokenContractCommand } from './dto/create-token-contract.command';
export { UpdateTokenContractCommand } from './dto/update-token-contract.command';

export const TokenContractCommandHandlers = [
  CreateTokenContractHandler,
  UpdateTokenContractHandler,
];
