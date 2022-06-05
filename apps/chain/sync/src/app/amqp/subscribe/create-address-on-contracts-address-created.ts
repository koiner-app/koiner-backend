import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CommandBus } from '@nestjs/cqrs';
import { Logger } from '@appvise/domain';
import { AddressCreatedMessage } from '@koiner/contracts/events';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application';

@Injectable()
export class CreateAddressOnContractsAddressCreated {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger
  ) {}
  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.chain.contracts_events_channel',
    },
    exchange: 'koiner.contracts.events',
    routingKey: AddressCreatedMessage.routingKey,
    queue: 'koiner.chain.contracts_events',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const event: AddressCreatedMessage = new AddressCreatedMessage(
        JSON.parse(message)
      );

      if (amqpMsg.fields.routingKey !== AddressCreatedMessage.routingKey) {
        reject();
      }

      this.commandBus
        .execute(
          new CreateOrUpdateAddressCommand({
            id: event.id,
            isProducer: event.isProducer,
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
