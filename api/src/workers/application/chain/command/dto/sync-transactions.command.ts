import { BlockJson } from 'koilib/lib/interface';

export class SyncTransactionsCommand {
  constructor(
    public readonly blockHeight: string,
    public readonly block: BlockJson,
  ) {}
}
