import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application';
import { OnEvent } from '@nestjs/event-emitter';
import { AddressUsedMessage } from '@koiner/chain/events';

@Injectable()
export class SyncAddressOnAddressUsed {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(AddressUsedMessage.eventName, { async: false })
  async handle(event: AddressUsedMessage): Promise<void> {
    await this.commandBus.execute(
      new CreateOrUpdateAddressCommand({
        id: event.id,
        isContract: event.isContract,
        isProducer: event.isProducer,
        isTokenContract: event.isTokenContract,
      })
    );
  }
}
