import { Command, CommandProps } from '@appvise/domain';
import {
  TransactionHeaderProps,
  TransactionReceiptProps,
} from '@koiner/chain/domain';

export class CreateTransactionCommand extends Command {
  constructor(props: CommandProps<CreateTransactionCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly blockHeight!: number;
  readonly header!: TransactionHeaderProps;
  readonly receipt!: TransactionReceiptProps;
  readonly operationCount!: number;
  readonly signatures!: string[];
  readonly transactionIndex!: number;
  readonly timestamp!: number;
}
