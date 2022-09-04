import { ContractCommandHandlers } from './command';
import { ContractEventHandlers } from './event';
import { ContractQueryHandlers } from './query';

export * from './command';
export * from './event';
export * from './query';

export const ContractApplicationHandlers = [
  ...ContractCommandHandlers,
  ...ContractEventHandlers,
  ...ContractQueryHandlers,
];
