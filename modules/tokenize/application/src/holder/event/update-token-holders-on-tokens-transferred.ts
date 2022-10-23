import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateTokenHolderCommand } from '../command';
import { TokensTransferredEventMessage } from '@koiner/tokenize/events';

@Injectable()
export class UpdateTokenHoldersOnTokensTransferred {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(`${TokensTransferredEventMessage.routingKey}.token_holder`, {
    async: false,
  })
  async handle(event: TokensTransferredEventMessage): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenHolderCommand({
        addressId: event.to,
        contractId: event.contractId,
        amountChanged: event.value,
        transferInCount: 1,
      })
    );

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
