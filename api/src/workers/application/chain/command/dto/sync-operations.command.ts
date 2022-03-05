import { TransactionJson } from 'koilib/lib/interface';

export class SyncOperationsCommand {
  constructor(
    public readonly blockHeight: string,
    public readonly transaction: TransactionJson,
  ) {}
}
