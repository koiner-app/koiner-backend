import { ItemQuery, SearchQuery } from '@appvise/domain';

export class ContractQuery extends ItemQuery {}
export class ContractsQuery extends SearchQuery {}
export class ContractEventQuery extends ItemQuery {}
export class ContractEventsQuery extends SearchQuery {}
export class ContractOperationQuery extends ItemQuery {}
export class ContractOperationsQuery extends SearchQuery {}

import { ContractHandler } from './contract.handler';
import { ContractsHandler } from './contracts.handler';
import { ContractEventHandler } from './contract-event.handler';
import { ContractEventsHandler } from './contract-events.handler';
import { ContractOperationHandler } from './contract-operation.handler';
import { ContractOperationsHandler } from './contract-operations.handler';

export const ContractQueryHandlers = [
  ContractHandler,
  ContractsHandler,
  ContractEventHandler,
  ContractEventsHandler,
  ContractOperationHandler,
  ContractOperationsHandler,
];
