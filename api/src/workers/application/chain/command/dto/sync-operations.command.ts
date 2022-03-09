import { TransactionJson } from 'koilib/lib/interface';
import { CreateOperationProps } from '@koiner/chain/domain';

export class SyncOperationsCommand {
  constructor(
    public readonly blockHeight: string,
    public readonly operations: CreateOperationProps[],
    public readonly transaction: TransactionJson,
  ) {}
}
