export class SyncBlocksCommand {
  constructor(
    public readonly startHeight: number,
    public readonly amount: number,
  ) {}
}
