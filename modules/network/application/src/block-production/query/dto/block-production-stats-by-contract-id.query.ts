import { SelectionSet } from '@appvise/domain';

export class BlockProductionStatsByContractIdQuery {
  constructor(
    public readonly contractId: string,
    public readonly selectionSet?: SelectionSet
  ) {}
}
