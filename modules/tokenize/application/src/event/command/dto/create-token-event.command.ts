import { Command, CommandProps } from '@appvise/domain';

export class CreateTokenEventCommand extends Command {
  constructor(props: CommandProps<CreateTokenEventCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly blockHeight!: number;
  readonly parentId!: string;
  readonly parentType!: string;
  readonly sequence?: number;
  readonly contractId!: string;
  readonly name!: string;
  readonly from?: string;
  readonly to?: string;
  readonly value!: number;
  readonly timestamp!: number;
}
