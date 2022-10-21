import { Command, CommandProps } from '@appvise/domain';

export class UpdateBlockProducerCommand extends Command {
  constructor(props: CommandProps<UpdateBlockProducerCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId!: string;
  readonly contractId!: string;
  readonly amountChanged!: number;
  readonly burnedValue!: number;
}
