import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateTokenContractCommand } from '../command';
import { TokensMintedEventMessage } from '@koiner/tokenize/events';

@Injectable()
export class UpdateTokenSupplyOnTokensMinted {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(`${TokensMintedEventMessage.eventName}.total_supply`, {
    async: false,
  })
  async handle(event: TokensMintedEventMessage): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenContractCommand({
        contractId: event.contractId,
        mintedTokens: event.value,
        mintCount: 1,
      })
    );
  }
}
