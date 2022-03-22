export class CreateChainCommand {
  constructor(
    public readonly id: string,
    public readonly headTopologyId: string,
    public readonly headTopologyPrevious: string,
    public readonly headTopologyHeight: number,
    public readonly lastIrreversibleBlock: number,
    public readonly lastSyncedBlock: number,
    public readonly syncing: boolean,
  ) {}
}
