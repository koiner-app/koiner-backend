import { Command, CommandProps } from '@appvise/domain';

export class UpdateTokenHolderCommand extends Command {
  constructor(props: CommandProps<UpdateTokenHolderCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId!: string;
  readonly contractId!: string;
  readonly amountChanged!: number;
  readonly mintCount?: number;
  readonly burnCount?: number;
  readonly transferInCount?: number;
  readonly transferOutCount?: number;
}
