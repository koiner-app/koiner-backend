import { SelectionSet } from '@appvise/domain';

export class TransactionQuery {
  constructor(
    public readonly transactionId: string,
    public readonly selectionSet?: SelectionSet,
  ) {}
}
