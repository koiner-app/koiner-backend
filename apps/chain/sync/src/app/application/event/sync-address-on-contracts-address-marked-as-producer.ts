import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddressMarkedAsProducerMessage } from '@koiner/contracts/events';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class SyncAddressOnContractsAddressMarkedAsProducer {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(AddressMarkedAsProducerMessage.routingKey, { async: false })
  async handle(event: AddressMarkedAsProducerMessage): Promise<void> {
    await this.commandBus.execute(
      new CreateOrUpdateAddressCommand({
        id: event.id,
        isProducer: true,
      })
    );
  }
}
