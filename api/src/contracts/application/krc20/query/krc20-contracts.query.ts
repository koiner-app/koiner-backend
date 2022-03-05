import { SearchRequest } from '@appvise/search';
import { SelectionSet } from '@appvise/domain';

export class Krc20ContractsQuery {
  constructor(
    public readonly request: SearchRequest,
    public readonly selectionSet?: SelectionSet,
  ) {}
}
