import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CommandBus } from '@nestjs/cqrs';
import { Logger } from '@appvise/domain';
import { AddressCreatedMessage } from '@koiner/chain/events';
import { CreateOrUpdateAddressCommand } from '@koiner/contracts/application';

@Injectable()
export class CreateAddressOnChainAddressCreated {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger
  ) {}
  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.channel.address',
    },
    exchange: 'koiner.chain.event',
    routingKey: AddressCreatedMessage.routingKey,
    queue: 'koiner.contracts.queue.address',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event: AddressCreatedMessage = new AddressCreatedMessage(
        JSON.parse(message)
      );

      this.commandBus
        .execute(
          new CreateOrUpdateAddressCommand({
            id: event.id,
          })
        )
        .then(() => resolve())
        .catch((error) => {
          this.logger.error(
            'Could not process chain.address.created queue event',
            error
          );
          reject();
        });
    });
  }
}
