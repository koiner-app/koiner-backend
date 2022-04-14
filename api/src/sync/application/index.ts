import SyncCommands from './chain/command';
import SyncEventHandlers from './chain/event';

export default [...SyncCommands.handlers, ...SyncEventHandlers];
