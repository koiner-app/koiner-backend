import { ItemQuery, SearchQuery } from '@appvise/domain';

export class ContractQuery extends ItemQuery {}
export class ContractsQuery extends SearchQuery {}
export class ContractEventQuery extends ItemQuery {}
export class ContractEventsQuery extends SearchQuery {}

import { ContractHandler } from './contract.handler';
import { ContractsHandler } from './contracts.handler';
import { ContractEventHandler } from './contract-event.handler';
import { ContractEventsHandler } from './contract-events.handler';

export const ContractQueryHandlers = [
  ContractHandler,
  ContractsHandler,
  ContractEventHandler,
  ContractEventsHandler,
];
