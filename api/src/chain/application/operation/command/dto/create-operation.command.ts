import { Command, CommandProps } from '@appvise/domain';
import { OperationType } from '@koiner/chain/domain';

export class CreateOperationCommand extends Command {
  constructor(props: CommandProps<CreateOperationCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeight: number;
  readonly transactionId: string;
  readonly operationIndex: number;
  readonly type: OperationType;
}
