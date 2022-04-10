import { koinos } from '@koiner/sync/proto/koinos.broadcast';
import Itransaction = koinos.protocol.Itransaction;
import { CreateOperationProps } from '@koiner/chain/domain';

export class SyncOperationsCommand {
  constructor(
    public readonly blockHeight: number,
    public readonly operations: CreateOperationProps[],
    public readonly transaction: Itransaction,
  ) {}
}
