import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Provider, utils } from 'koilib';
import { CreateBlockCommand } from '@koiner/chain/application/block/command';
import { SyncBlockCommand } from './dto/sync-block.command';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application/address/command';
import { ContractStandardType } from '@koiner/contracts/domain';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';
import { SyncTransactionsCommand } from '@koiner/sync/application/chain/command/dto/sync-transactions.command';
import { CreateBlockRewardCommand } from '@koiner/contracts/application/krc20/command';
import { Logger } from '@nestjs/common';
import { koinos } from '@config';

@CommandHandler(SyncBlockCommand)
export class SyncBlockHandler implements ICommandHandler<SyncBlockCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
    private readonly contractStandardService: ContractStandardService,
    private readonly logger: Logger,
  ) {}

  async execute(command: SyncBlockCommand): Promise<void> {
    try {
      const height = parseInt(command.block.header.height.toString());
      const signer = <string>command.block.header.signer;

      // Add address for signer
      await this.commandBus.execute(new CreateOrUpdateAddressCommand(signer));

      let mintOperation;
      let blockProducerId;
      let producerRewards: number | undefined;

      if (command.receipt.events) {
        const mintEvent = command.receipt.events.find(
          (event) => event.name === 'koin.mint',
        );

        if (mintEvent) {
          // // Decode mint event
          mintOperation = await this.contractStandardService.decodeOperation(
            ContractStandardType.krc20,
            koinos.koinContractId,
            utils.tokenAbi.methods.mint.entryPoint,
            mintEvent.data,
          );

          blockProducerId = mintEvent.impacted[0];
          producerRewards = parseInt(<string>mintOperation.args.value);

          // Add address for block producer
          await this.commandBus.execute(
            new CreateOrUpdateAddressCommand(
              blockProducerId,
              true,
              producerRewards,
            ),
          );
        }
      }

      await this.commandBus.execute(
        new CreateBlockCommand({
          id: command.block_id,
          header: {
            previous: command.block.header.previous,
            height,
            timestamp: parseInt(command.block.header.timestamp),
            previousStateMerkleRoot: <string>(
              command.block.header.previous_state_merkle_root
            ),
            transactionMerkleRoot: <string>(
              command.block.header.transaction_merkle_root
            ),
            signer,
          },
          signature: <string>command.block.signature,
          transactionCount: command.block.transactions
            ? command.block.transactions.length
            : 0,
          receipt: {
            diskStorageUsed: command.receipt.disk_storage_used
              ? parseInt(command.receipt.disk_storage_used.toString())
              : 0,
            networkBandwidthUsed: command.receipt.network_bandwidth_used
              ? parseInt(command.receipt.network_bandwidth_used.toString())
              : 0,
            computeBandwidthUsed: command.receipt.compute_bandwidth_used
              ? parseInt(command.receipt.compute_bandwidth_used.toString())
              : 0,
            eventCount: command.receipt.events
              ? command.receipt.events.length
              : 0,
          },
        }),
      );

      if (command.block.transactions) {
        await this.commandBus.execute(
          new SyncTransactionsCommand(height, command.block),
        );
      }

      if (producerRewards && mintOperation) {
        await this.commandBus.execute(
          new CreateBlockRewardCommand(
            height,
            <string>mintOperation.args.to,
            parseInt(<string>mintOperation.args.value),
            koinos.koinContractId,
          ),
        );
      }
    } catch (error) {
      this.logger.error(error.message, error.stack, 'Sync-blocks error');
    }
  }
}
