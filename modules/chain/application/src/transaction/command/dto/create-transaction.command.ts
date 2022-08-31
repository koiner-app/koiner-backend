import { Command, CommandProps } from '@appvise/domain';

export class CreateTransactionCommand extends Command {
  constructor(props: CommandProps<CreateTransactionCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly blockHeight!: number;
  readonly rcLimit!: string;
  readonly payer!: string;
  readonly signature!: string;
  readonly transactionIndex!: number;
  readonly operationCount!: number;
  readonly nonce?: string;
  readonly operationMerkleRoot?: string;
  readonly timestamp!: number;
}
