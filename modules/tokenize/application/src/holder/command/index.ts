import { UpdateTokenHolderHandler } from './update-token-holder.handler';

export { UpdateTokenHolderCommand } from './dto/update-token-holder.command';

export const TokenHolderCommandHandlers = [UpdateTokenHolderHandler];
