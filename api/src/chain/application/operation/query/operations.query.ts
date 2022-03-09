import { SearchRequest } from '@appvise/search';
import { SelectionSet } from '@appvise/domain';

export class OperationsQuery {
  constructor(
    public readonly request: SearchRequest,
    public readonly selectionSet?: SelectionSet,
  ) {}
}
