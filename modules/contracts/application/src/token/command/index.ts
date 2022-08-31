import { CreateTokenContractHandler } from './create-token-contract.handler';
import { CreateTokenEventHandler } from './create-token-event.handler';
import { CreateTokenOperationHandler } from './create-token-operation.handler';
import { UpdateTokenContractHandler } from './update-token-contract.handler';
import { UpdateTokenHolderHandler } from './update-token-holder.handler';

export { CreateTokenContractCommand } from './dto/create-token-contract.command';
export { CreateTokenEventCommand } from './dto/create-token-event.command';
export { CreateTokenOperationCommand } from './dto/create-token-operation.command';
export { UpdateTokenContractCommand } from './dto/update-token-contract.command';
export { UpdateTokenHolderCommand } from './dto/update-token-holder.command';

export const TokenCommandHandlers = [
  CreateTokenContractHandler,
  CreateTokenEventHandler,
  CreateTokenOperationHandler,
  UpdateTokenContractHandler,
  UpdateTokenHolderHandler,
];
