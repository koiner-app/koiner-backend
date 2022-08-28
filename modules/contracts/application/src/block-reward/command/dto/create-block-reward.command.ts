import { Command, CommandProps } from '@appvise/domain';

export class CreateBlockRewardCommand extends Command {
  constructor(props: CommandProps<CreateBlockRewardCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeight!: number;
  readonly producerId!: string;
  readonly contractId!: string;
  readonly value!: number;
  readonly burnedContractId?: string;
  readonly burnerId?: string;
  readonly burnedValue?: number;
  readonly roi?: number;
}
