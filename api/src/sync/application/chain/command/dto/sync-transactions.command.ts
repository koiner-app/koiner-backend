import { koinos } from '@koiner/sync/proto/koinos.broadcast';
import Iblock = koinos.protocol.Iblock;

export class SyncTransactionsCommand {
  constructor(
    public readonly blockHeight: number,
    public readonly block: Iblock,
  ) {}
}
