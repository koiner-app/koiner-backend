import { BlockJson } from 'koilib/lib/interface';

export class SyncTransactionsCommand {
  constructor(
    public readonly blockHeight: number,
    public readonly block: BlockJson,
  ) {}
}
