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

@Injectable()
export class BlockAcceptedHandler {
  constructor(
    private readonly commandBus: CommandBus,
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
      const blockSigner = utils.encodeBase58(event.block.header.signer);
      const command = new CreateBlockCommand(
        `0x${utils.toHexString(event.block.id)}`,
        `0x${utils.toHexString(event.block.header.previous)}`,
        parseInt(event.block.header.height.toString()),
        parseInt(event.block.header.timestamp.toString()),
        utils.encodeBase64(event.block.header.previousStateMerkleRoot),
        utils.encodeBase64(event.block.header.transactionMerkleRoot),
        blockSigner,
        utils.encodeBase64(event.block.signature),
        event.block.transactions ? event.block.transactions.length : 0,
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
