import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateTokenContractCommand } from '../command';
import { TokensBurnedEventMessage } from '@koiner/tokenize/events';

@Injectable()
export class UpdateTokenSupplyOnTokensBurned {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(`${TokensBurnedEventMessage.routingKey}.total_supply`, {
    async: false,
  })
  async handle(event: TokensBurnedEventMessage): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenContractCommand({
        contractId: event.contractId,
        burnedTokens: event.value,
      })
    );
  }
}
