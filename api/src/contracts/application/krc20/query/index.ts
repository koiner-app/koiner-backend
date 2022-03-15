import { ItemQuery, SearchQuery } from '@appvise/domain';

export class Krc20ContractQuery extends ItemQuery {}
export class Krc20ContractsQuery extends SearchQuery {}

import { Krc20ContractHandler } from './krc20-contract.handler';
import { Krc20ContractsHandler } from './krc20-contracts.handler';

export default {
  handlers: [Krc20ContractHandler, Krc20ContractsHandler],
};
