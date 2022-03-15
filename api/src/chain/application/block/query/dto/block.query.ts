import { SelectionSet } from '@appvise/domain';

export class BlockQuery {
  constructor(
    public readonly blockHeight: number,
    public readonly selectionSet?: SelectionSet,
  ) {}
}
