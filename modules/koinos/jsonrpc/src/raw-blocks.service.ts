import { Injectable } from '@nestjs/common';
import {
  BlockJson,
  OperationJson,
  TransactionJson,
  TransactionReceipt,
} from 'koilib/lib/interface';
import { Provider } from 'koilib';
import { readFile, writeFile } from 'fs/promises';
import { koinosConfig } from './koinos.config';

export interface RawBlock {
  block_id: string;
  block_height: string;
  block: BlockJson;
  receipt: {
    [x: string]: any;
    events: {
      sequence: number;
      source: string;
      name: string;
      data: string;
      impacted: string[];
    }[];
    transaction_receipts: TransactionReceipt[];
  };
}

@Injectable()
export class RawBlocksService {
  private blocksInMemory: Record<string, RawBlock> = {};

  constructor(private readonly provider: Provider) {}

  async getBlocks(startHeight: number, amount = 1): Promise<RawBlock[]> {
    const blocks = [];
    const missingBlocksSets: {
      startHeight: number;
      amount: number;
    }[] = [];

    for (
      let height = startHeight;
      height < startHeight + Number(amount);
      height++
    ) {
      try {
        const data = await readFile(
          `${koinosConfig.cacheDir}/${height}.json`,
          'utf8'
        );
        blocks.push(JSON.parse(data));
      } catch {
        let addedToSet = false;

        for (let i = 0; i < missingBlocksSets.length; i++) {
          if (
            missingBlocksSets[i].startHeight + missingBlocksSets[i].amount ===
            height
          ) {
            // Add to existing set if it's the next height
            missingBlocksSets[i] = {
              startHeight: missingBlocksSets[i].startHeight,
              amount: missingBlocksSets[i].amount + 1,
            };

            addedToSet = true;
          }
        }

        if (!addedToSet) {
          // Create new set
          missingBlocksSets.push({
            startHeight: height,
            amount: 1,
          });
        }
      }
    }

    if (missingBlocksSets) {
      for (let i = 0; i < missingBlocksSets.length; i++) {
        const newBlocks = await this._koilibGetBlocks(
          missingBlocksSets[i].startHeight,
          missingBlocksSets[i].amount
        );

        for (let i = 0; i < newBlocks.length; i++) {
          // Add to result
          blocks.push(newBlocks[i]);

          // Save to file to reduce unnecessary api calls by other sync services
          await writeFile(
            `${koinosConfig.cacheDir}/${newBlocks[
              i
            ].block_height.toString()}.json`,
            JSON.stringify(newBlocks[i])
          );
        }
      }
    }

    return blocks;
  }

  async getBlocksByIds(blockIds: string[]): Promise<RawBlock[]> {
    const blocks = await this._koilibGetBlocksByIds(blockIds);

    // console.log('RESET IN MEMORY');
    // this.blocksInMemory = {};

    for (let i = 0; i < blocks.length; i++) {
      // Save to memory
      this.blocksInMemory[blocks[i].block_height.toString()] = blocks[i];
    }

    return blocks;
  }

  async getBlock(height: number): Promise<RawBlock> {
    const blocks = await this.getBlocks(height, 1);

    return blocks[0];
  }

  async getTransaction(
    height: number,
    transactionId: string
  ): Promise<TransactionJson | undefined> {
    const rawBlock = await this.getBlock(height);

    return rawBlock.block.transactions
      ? rawBlock.block.transactions.find((tx) => tx.id === transactionId)
      : undefined;
  }

  async getTransactionReceipt(
    height: number,
    transactionId: string
  ): Promise<TransactionReceipt | undefined> {
    const rawBlock = await this.getBlock(height);

    return rawBlock.receipt.transaction_receipts.find(
      (txReceipt) => txReceipt.id === transactionId
    );
  }

  async getOperation(
    height: number,
    transactionId: string,
    operationIndex: number
  ): Promise<OperationJson | undefined> {
    const transaction = await this.getTransaction(height, transactionId);

    return transaction && transaction.operations
      ? transaction.operations[operationIndex]
      : undefined;
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
  private async _koilibGetBlocks(
    height: number,
    numBlocks = 1,
    idRef?: string
  ): Promise<RawBlock[]> {
    let blockIdRef = idRef;
    if (!blockIdRef) {
      const head = await this.provider.getHeadInfo();
      blockIdRef = head.head_topology.id;
    }
    return (
      await this.provider.call<{
        block_items: RawBlock[];
      }>('block_store.get_blocks_by_height', {
        head_block_id: blockIdRef,
        ancestor_start_height: height,
        num_blocks: numBlocks,
        return_block: true,
        return_receipt: true,
      })
    ).block_items;
  }

  private async _koilibGetBlocksByIds(blockIds: string[]): Promise<RawBlock[]> {
    const blocks = await this.provider.call<{
      block_items: RawBlock[];
    }>('block_store.get_blocks_by_id', {
      block_ids: blockIds,
      return_block: true,
      return_receipt: true,
    });

    return blocks.block_items;
  }
}
