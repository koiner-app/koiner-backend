import ChainSyncCommands from './command';
import ChainSyncEventHandlers from './event';

export default [...ChainSyncCommands.handlers, ...ChainSyncEventHandlers];
