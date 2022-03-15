import { SelectionSet } from '@appvise/domain';

export class ItemQuery {
  constructor(
    public readonly id: string,
    public readonly selectionSet?: SelectionSet,
  ) {}
}
