import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddressCreatedMessage } from '@koiner/contracts/events';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class SyncAddressOnContractsAddressCreated {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(AddressCreatedMessage.routingKey, { async: false })
  async handle(event: AddressCreatedMessage): Promise<void> {
    await this.commandBus.execute(
      new CreateOrUpdateAddressCommand({
        id: event.id,
        isProducer: event.isProducer,
      })
    );
  }
}
