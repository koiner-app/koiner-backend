import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Provider } from 'koilib';
import { BlockJson } from 'koilib/lib/interface';
import { SyncBlocksCommand } from './dto/sync-blocks.command';
import { SyncBlockCommand } from '@koiner/sync/application/chain/command/dto/sync-block.command';

@CommandHandler(SyncBlocksCommand)
export class SyncBlocksHandler implements ICommandHandler<SyncBlocksCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
  ) {}

  async execute(command: SyncBlocksCommand): Promise<void> {
    try {
      const blocks = await this.getBlocks(command.startHeight, command.amount);

      if (blocks) {
        for (const block of blocks) {
          await this.commandBus.execute(
            new SyncBlockCommand({
              ...block,
            }),
          );
        }
      }
    } catch (error) {
      console.log('Sync-blocks error', error);
    }
  }
  /**
   * Include getBlocks from koilib here because there is not a way yet
   * to retrieve the blocks with the receipts.
   *
   * Function to get consecutive blocks in descending order
   * @param height - Starting block height
   * @param numBlocks - Number of blocks to fetch
   * @param idRef - Block ID reference to speed up searching blocks.
   * This ID must be from a greater block height. By default it
   * gets the ID from the block head.
   */
  async getBlocks(
    height: number,
    numBlocks = 1,
    idRef?: string,
  ): Promise<
    {
      block_id: string;
      block_height: string;
      block: BlockJson;
      receipt: {
        [x: string]: any;
      };
    }[]
  > {
    let blockIdRef = idRef;
    if (!blockIdRef) {
      const head = await this.provider.getHeadInfo();
      blockIdRef = head.head_topology.id;
    }
    return (
      await this.provider.call<{
        block_items: {
          block_id: string;
          block_height: string;
          block: BlockJson;
          receipt: {
            [x: string]: unknown;
          };
        }[];
      }>('block_store.get_blocks_by_height', {
        head_block_id: blockIdRef,
        ancestor_start_height: height,
        num_blocks: numBlocks,
        return_block: true,
        return_receipt: true,
      })
    ).block_items;
  }
}
