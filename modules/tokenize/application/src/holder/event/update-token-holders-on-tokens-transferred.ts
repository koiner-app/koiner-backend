import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateTokenHolderCommand } from '../command';
import { TokensTransferredEventMessage } from '@koiner/tokenize/events';

@Injectable()
export class UpdateTokenHoldersOnTokensTransferred {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(`${TokensTransferredEventMessage.eventName}.to.token_holder`, {
    async: false,
  })
  async handleTo(event: TokensTransferredEventMessage): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenHolderCommand({
        addressId: event.to,
        contractId: event.contractId,
        amountChanged: event.value,
        transferInCount: 1,
      })
    );
  }

  @OnEvent(`${TokensTransferredEventMessage.eventName}.from.token_holder`, {
    async: false,
  })
  async handleFrom(event: TokensTransferredEventMessage): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenHolderCommand({
        addressId: event.from,
        contractId: event.contractId,
        amountChanged: -event.value,
        transferOutCount: 1,
      })
    );
  }
}
