import { SearchRequest } from '@appvise/search';
import { SelectionSet } from '@appvise/domain';

export class TransactionsQuery {
  constructor(
    public readonly request: SearchRequest,
    public readonly selectionSet?: SelectionSet,
  ) {}
}
