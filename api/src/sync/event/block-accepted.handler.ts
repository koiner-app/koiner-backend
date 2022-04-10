import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { Serializer, utils } from 'koilib';
import { broadcastDescriptors } from '@koiner/sync/proto/broadcast-descriptors';
import { koinos } from '@koiner/sync/proto/koinos.broadcast';
import block_accepted = koinos.broadcast.block_accepted;
import { CreateBlockCommand } from '@koiner/chain/application/block/command';
import { SyncTransactionsCommand } from '@koiner/sync/application/chain/command';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application/address/command';
import { ContractStandardType } from '@koiner/contracts/domain';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';

@Injectable()
export class BlockAcceptedHandler {
  static KOIN_CONTRACT_ID = '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ';
  static KOIN_MINT_ENTRYPOINT = 0xdc6f17bb;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly contractStandardService: ContractStandardService,
    private readonly logger: Logger,
  ) {}

  @RabbitSubscribe({
    exchange: 'koinos.event',
    routingKey: 'koinos.block.accept',
    queue: 'koiner.block.accept',
    errorHandler: (error) => console.log('error =', error),
    allowNonJsonMessages: true,
  })
  public async pubSubHandler(msg: any, amqpMsg: ConsumeMessage) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const serializer = new Serializer(broadcastDescriptors, {
      defaultTypeName: 'block_accepted',
    });

    const message = await serializer.deserialize(amqpMsg.content);
    const event: block_accepted = <block_accepted>(<unknown>message);

    this.logger.log(
      event.block.header.height.toString(),
      'BlockAcceptedHandler height',
    );
    this.logger.verbose(event, 'BlockAcceptedHandler.event');

    try {
      const signer = utils.encodeBase58(event.block.header.signer);

      // Add address for signer
      await this.commandBus.execute(new CreateOrUpdateAddressCommand(signer));

      const mintEvent = event.receipt.events.find(
        (event) => event.name === 'koin.mint',
      );

      // Decode mint event
      const mintOperation = await this.contractStandardService.decodeOperation(
        ContractStandardType.krc20,
        BlockAcceptedHandler.KOIN_CONTRACT_ID,
        BlockAcceptedHandler.KOIN_MINT_ENTRYPOINT,
        utils.encodeBase64(mintEvent.data),
      );

      const blockProducerId = utils.encodeBase58(mintEvent.impacted[0]);

      // Add address for block producer
      await this.commandBus.execute(
        new CreateOrUpdateAddressCommand(
          blockProducerId,
          true,
          parseInt(<string>mintOperation.args.value),
        ),
      );

      const command = new CreateBlockCommand(
        `0x${utils.toHexString(event.block.id)}`,
        {
          previous: `0x${utils.toHexString(event.block.header.previous)}`,
          height: parseInt(event.block.header.height.toString()),
          timestamp: parseInt(event.block.header.timestamp.toString()),
          previousStateMerkleRoot: utils.encodeBase64(
            event.block.header.previousStateMerkleRoot,
          ),
          transactionMerkleRoot: utils.encodeBase64(
            event.block.header.transactionMerkleRoot,
          ),
          signer,
        },
        utils.encodeBase64(event.block.signature),
        event.block.transactions ? event.block.transactions.length : 0,
        {
          id: blockProducerId,
          rewards: parseInt(<string>mintOperation.args.value),
        },
        {
          diskStorageUsed: event.receipt.diskStorageUsed
            ? parseInt(event.receipt.diskStorageUsed.toString())
            : 0,
          networkBandwidthUsed: event.receipt.networkBandwidthUsed
            ? parseInt(event.receipt.networkBandwidthUsed.toString())
            : 0,
          computeBandwidthUsed: event.receipt.computeBandwidthUsed
            ? parseInt(event.receipt.computeBandwidthUsed.toString())
            : 0,
          eventCount: event.receipt.events.length,
        },
      );

      this.logger.verbose(command, 'BlockAcceptedHandler.command');
      this.logger.verbose(
        event.receipt.events,
        'BlockAcceptedHandler block.receipt.events',
      );

      await this.commandBus.execute(command);

      if (event.block.transactions) {
        await this.commandBus.execute(
          new SyncTransactionsCommand(
            parseInt(event.block.header.height.toString()),
            event.block,
          ),
        );
      }
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'BlockAcceptedHandler.error',
      );
    }
  }
}
