import { ContractCommandHandlers } from './command';
import { ContractQueryHandlers } from './query';

export * from './command';
export * from './query';

export const ContractApplicationHandlers = [
  ...ContractCommandHandlers,
  ...ContractQueryHandlers,
];
