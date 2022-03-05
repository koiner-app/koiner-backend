import { Krc20ContractHandler } from './krc20-contract.handler';
import { Krc20ContractsHandler } from './krc20-contracts.handler';

export { Krc20ContractQuery } from './krc20-contract.query';
export { Krc20ContractsQuery } from './krc20-contracts.query';

export default {
  handlers: [Krc20ContractHandler, Krc20ContractsHandler],
};
