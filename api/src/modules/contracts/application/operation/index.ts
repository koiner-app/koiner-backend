import { ContractOperationCommandHandlers } from './command';
import { ContractOperationQueryHandlers } from './query';

export * from './command';
export * from './query';

export const ContractOperationApplicationHandlers = [
  ...ContractOperationCommandHandlers,
  ...ContractOperationQueryHandlers,
];
