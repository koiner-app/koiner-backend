export class UpdateChainCommand {
  constructor(
    public readonly chainId: string,
    public readonly headTopologyId: string,
    public readonly headTopologyPrevious: string,
    public readonly headTopologyHeight: number,
    public readonly lastIrreversibleBlock: number,
    public readonly lastSyncedBlock: number,
    public readonly syncing: boolean,
    public readonly stopped?: boolean,
  ) {}
}
