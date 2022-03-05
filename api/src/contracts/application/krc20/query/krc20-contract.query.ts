import { SelectionSet } from '@appvise/domain';

export class Krc20ContractQuery {
  constructor(
    public readonly contractId: string,
    public readonly selectionSet?: SelectionSet,
  ) {}
}
