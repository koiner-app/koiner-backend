export class CreateBlockCommand {
  constructor(
    public readonly id: string,
    public readonly header: {
      previous: string;
      height: number;
      timestamp: number;
      previousStateMerkleRoot: string;
      transactionMerkleRoot: string;
      signer: string;
    },
    public readonly signature: string,
    public readonly transactionCount: number,
    public readonly producer: {
      id: string;
      rewards: number;
    },
    public readonly receipt: {
      diskStorageUsed: number;
      networkBandwidthUsed: number;
      computeBandwidthUsed: number;
      eventCount: number;
    },
  ) {}
}
