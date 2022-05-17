import { ItemQuery, SearchQuery } from '@appvise/domain';

export class ContractQuery extends ItemQuery {}
export class ContractsQuery extends SearchQuery {}

import { ContractHandler } from './contract.handler';
import { ContractsHandler } from './contracts.handler';

export const ContractQueryHandlers = [ContractHandler, ContractsHandler];
