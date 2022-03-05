import { SelectionSet } from '@appvise/domain';

export class ContractQuery {
  constructor(
    public readonly contractId: string,
    public readonly selectionSet?: SelectionSet,
  ) {}
}
