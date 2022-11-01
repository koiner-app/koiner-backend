import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateTokenHolderCommand } from '../command';
import { TokensBurnedEventMessage } from '@koiner/tokenize/events';

@Injectable()
export class UpdateTokenHolderOnTokensBurned {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(`${TokensBurnedEventMessage.eventName}.from.token_holder`, {
    async: false,
  })
  async handle(event: TokensBurnedEventMessage): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenHolderCommand({
        addressId: event.from,
        contractId: event.contractId,
        amountChanged: -event.value,
        burnCount: 1,
      })
    );
  }
}
