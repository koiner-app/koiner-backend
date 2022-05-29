import { SelectionSet } from '@appvise/domain';

export class BlockRewardQuery {
  constructor(
    public readonly blockHeight: number,
    public readonly selectionSet?: SelectionSet,
  ) {}
}
