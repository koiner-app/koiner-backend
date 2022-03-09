import { SelectionSet } from '@appvise/domain';

export class OperationQuery {
  constructor(
    public readonly operationId: string,
    public readonly selectionSet?: SelectionSet,
  ) {}
}
