import { Command, CommandProps } from '@appvise/domain';

export class CreateBlockRewardCommand extends Command {
  constructor(props: CommandProps<CreateBlockRewardCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockId!: string;
  readonly blockHeight!: number;
  readonly producerId!: string;
  readonly mintedValue!: number;
  readonly burnedValue!: number;
  readonly timestamp!: number;
}
