import { Command, CommandProps } from '@appvise/domain';

export class CreateBlockCommand extends Command {
  constructor(props: CommandProps<CreateBlockCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly header!: {
    previous: string;
    height: number;
    timestamp: number;
    previousStateMerkleRoot: string;
    transactionMerkleRoot: string;
    signer: string;
  };
  readonly signature!: string;
  readonly transactionCount!: number;
  readonly receipt!: {
    diskStorageUsed: number;
    networkBandwidthUsed: number;
    computeBandwidthUsed: number;
    eventCount: number;
  };
}
