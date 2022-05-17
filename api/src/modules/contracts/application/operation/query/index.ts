import { ItemQuery, SearchQuery } from '@appvise/domain';

export class ContractOperationQuery extends ItemQuery {}
export class ContractOperationsQuery extends SearchQuery {}

import { ContractOperationHandler } from './contract-operation.handler';
import { ContractOperationsHandler } from './contract-operations.handler';

export const ContractOperationQueryHandlers = [
  ContractOperationHandler,
  ContractOperationsHandler,
];
