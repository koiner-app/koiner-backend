import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Signer, Contract, Provider, Serializer, utils } from 'koilib';
import { CreateBlockCommand } from '@koiner/chain/application/block/command';
import { CreateTransactionCommand } from '@koiner/chain/application/transaction/command';

@Injectable()
export class SyncBlocksWorker {
  constructor(private commandBus: CommandBus) {}

  private readonly logger = new Logger(SyncBlocksWorker.name);

  // @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('Called every 10 seconds');

    const blockNumber = 95804; // 923881; // 895984;
    const thisOne =
      '0x1220cfa4ef6daf25aad91d7d9516ee730118580cbf9ea6dc543134b87aedfe946543';
    const MAX_NB_BLOCKS_TO_FETCH = 10000;
    let nbBlockToFetch = MAX_NB_BLOCKS_TO_FETCH;

    const provider = new Provider('http://api.koinos.io:8080'); // process.env.KOINOS_RPC
    const signer = Signer.fromSeed('seed');
    const headInfo = await provider.getHeadInfo();

    console.log(headInfo);
    const activeBlockDataSerializer = new Serializer(utils.ProtocolTypes, {
      defaultTypeName: 'active_block_data',
    });

    const activeTransactionDataSerializer = new Serializer(
      utils.ProtocolTypes,
      {
        defaultTypeName: 'active_transaction_data',
      },
    );

    const currentHeight = parseInt(headInfo.head_topology.height);

    let lastBlockNumber = blockNumber + nbBlockToFetch - 1;
    console.log(
      'lastBlockNumber > currentHeight',
      lastBlockNumber,
      currentHeight,
    );
    if (lastBlockNumber > currentHeight) {
      lastBlockNumber = currentHeight;
      nbBlockToFetch = lastBlockNumber - blockNumber;
      console.log('nbBlockToFetch = ', nbBlockToFetch);

      if (nbBlockToFetch > MAX_NB_BLOCKS_TO_FETCH) {
        nbBlockToFetch = MAX_NB_BLOCKS_TO_FETCH;
      }
    }
    console.log(
      `processing block ${blockNumber} through ${lastBlockNumber} (currentHeight: ${currentHeight}, lastIrreversible: ${headInfo.last_irreversible_block}, nbBlockToFetch: ${nbBlockToFetch})`,
    );

    const blocks = await provider.getBlocks(blockNumber, nbBlockToFetch);

    if (blocks) {
      console.log('blocks not empty');
      console.log(blocks.length);
      // await pgUtils.query('BEGIN');

      for (let blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
        const block = blocks[blockIdx];
        console.log('blockIdx + height', blockIdx, block.block_height);

        const active = await activeBlockDataSerializer.deserialize(
          block.block.active,
        );

        const block_signer = utils.encodeBase58(
          utils.decodeBase64(<string>active.signer),
        );

        // console.log('active', active);
        // console.log('block_signer', block_signer);

        await this.commandBus.execute(
          new CreateBlockCommand(
            block.block_id,
            block.block.header.previous,
            parseInt(block.block_height),
            parseInt(block.block.header.timestamp),
            <string>active.previous_state_merkle_root,
            <string>active.transaction_merkle_root,
            block_signer,
            block.block.signature_data,
            block.block.transactions ? block.block.transactions.length : 0,
          ),
        );

        if (block.block.transactions) {
          console.log('transactions');

          //metadata.total_number_transactions += block.block.transactions.length
          for (
            let txIdx = 0;
            txIdx < block.block.transactions.length;
            txIdx++
          ) {
            const tx = block.block.transactions[txIdx];
            const transactionSigner = await Signer.recoverAddress(tx);
            const active = await activeTransactionDataSerializer.deserialize(
              tx.active,
            );

            // transactionSigner address from : 13QXPtciXMFJehbhKtfz4RFJGKGkdwMHpg
            // address to   : 1MyhQ3GyRtbWRENSNNyVNmAXqEquiAX8Nc
            // signer       : 15f9UoCMAZbhpC6RbdcFxFUZhWPCx5hsbb
            console.log('tx = ' + tx);
            if (tx === thisOne) {
              console.log('FOUND', block.block_id);
            }

            console.log(transactionSigner);
            console.log(active);

            await this.commandBus.execute(
              new CreateTransactionCommand(
                tx.id,
                parseInt(block.block_height),
                <string>active.rc_limit,
                transactionSigner,
                tx.signature_data,
                Array.isArray(active.operations) ? active.operations.length : 0,
                txIdx,
                <string>active.nonce,
              ),
            );

            //             metadata.total_number_operations += active.operations.length;
          }
        }
      }
    }
  }
}
