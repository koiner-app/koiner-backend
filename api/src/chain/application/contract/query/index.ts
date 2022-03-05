import { ContractHandler } from './contract.handler';
import { ContractsHandler } from './contracts.handler';

export { ContractQuery } from './contract.query';
export { ContractsQuery } from './contracts.query';

export default {
  handlers: [ContractHandler, ContractsHandler],
};
