import { Command, CommandProps } from '@appvise/domain';
import { BlockJson } from 'koilib/lib/interface';

export class SyncBlockCommand extends Command {
  constructor(props: CommandProps<SyncBlockCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly block_id: string;
  readonly block_height: string;
  readonly block: BlockJson;
  readonly receipt: {
    [x: string]: any;
  };
}
