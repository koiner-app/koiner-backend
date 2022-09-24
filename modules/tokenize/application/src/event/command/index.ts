import { CreateTokenEventHandler } from './create-token-event.handler';

export { CreateTokenEventCommand } from './dto/create-token-event.command';

export const TokenEventCommandHandlers = [CreateTokenEventHandler];
