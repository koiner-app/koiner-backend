import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateTokenHolderCommand } from '../command';
import { TokensMintedEventMessage } from '@koiner/tokenize/events';

@Injectable()
export class UpdateTokenHolderOnTokensMinted {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(`${TokensMintedEventMessage.routingKey}.token_holder`, {
    async: false,
  })
  async handle(event: TokensMintedEventMessage): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenHolderCommand({
        addressId: event.to,
        contractId: event.contractId,
        amountChanged: event.value,
      })
    );
  }
}
