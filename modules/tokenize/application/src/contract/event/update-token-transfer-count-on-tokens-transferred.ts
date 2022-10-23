import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateTokenContractCommand } from '../command';
import { TokensTransferredEventMessage } from '@koiner/tokenize/events';

@Injectable()
export class UpdateTokenTransferCountOnTokensTransferred {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(`${TokensTransferredEventMessage.routingKey}.total_supply`, {
    async: false,
  })
  async handle(event: TokensTransferredEventMessage): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenContractCommand({
        contractId: event.contractId,
        transferCount: 1,
      })
    );
  }
}
