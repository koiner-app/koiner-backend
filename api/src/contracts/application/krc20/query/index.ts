import { ItemQuery, SearchQuery } from '@appvise/domain';

export class Krc20ContractQuery extends ItemQuery {}
export class Krc20ContractsQuery extends SearchQuery {}
export class Krc20OperationQuery extends ItemQuery {}
export class Krc20OperationsQuery extends SearchQuery {}

import { Krc20ContractHandler } from './krc20-contract.handler';
import { Krc20ContractsHandler } from './krc20-contracts.handler';
import { Krc20OperationHandler } from './krc20-operation.handler';
import { Krc20OperationsHandler } from './krc20-operations.handler';

export default {
  handlers: [
    Krc20ContractHandler,
    Krc20ContractsHandler,
    Krc20OperationHandler,
    Krc20OperationsHandler,
  ],
};
