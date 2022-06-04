import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ConsumeMessage } from 'amqplib';
import { Serializer } from 'koilib';
import { broadcastDescriptors } from '../../proto/broadcast-descriptors';
// import { SyncBlockCommand } from '../application';

@Injectable()
export class BlockAcceptedHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger
  ) {}

  @RabbitSubscribe({
    exchange: 'koinos.event',
    routingKey: 'koinos.block.accept',
    queue: 'koiner.block.accept',
    allowNonJsonMessages: true,
  })
  public async pubSubHandler(msg: any, amqpMsg: ConsumeMessage) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const serializer = new Serializer(broadcastDescriptors, {
      defaultTypeName: 'block_accepted',
    });

    const event: any = await serializer.deserialize(amqpMsg.content);

    this.logger.log(
      event.block.header.height.toString(),
      'BlockAcceptedHandler height'
    );

    //   try {
    //     await this.commandBus.execute(
    //       new SyncBlockCommand({
    //         ...event,
    //       })
    //     );
    //   } catch (error) {
    //     this.logger.error(
    //       error.message,
    //       error.stack,
    //       'BlockAcceptedHandler.error'
    //     );
    //   }
  }
}
