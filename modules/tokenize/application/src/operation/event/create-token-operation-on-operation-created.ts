import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import {
  ContractStandardService,
  ContractStandardType,
} from '@koiner/contracts/standards';
import { ContractOperationWithTokenTypeCreatedMessage } from '@koiner/contracts/events';
import { CreateTokenOperationCommand } from '../..';

@Injectable()
export class CreateTokenOperationOnOperationCreated {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly contractStandardService: ContractStandardService
  ) {}

  @OnEvent(ContractOperationWithTokenTypeCreatedMessage.eventName, {
    async: false,
  })
  async handle(
    event: ContractOperationWithTokenTypeCreatedMessage
  ): Promise<void> {
    // Ignore invalid events
    if (!event.args) {
      return;
    }

    const decodedOperation = await this.contractStandardService.decodeOperation(
      event.contractId,
      event.entryPoint,
      event.args,
      ContractStandardType.token
    );

    await this.commandBus.execute(
      new CreateTokenOperationCommand({
        id: event.operationId,
        blockHeight: event.blockHeight,
        contractId: event.contractId,
        transactionId: event.transactionId,
        name: decodedOperation.name,
        from: <string>decodedOperation.data.from,
        to: <string>decodedOperation.data.to,
        value: parseInt(<string>decodedOperation.data.value),
        timestamp: event.timestamp,
      })
    );
  }
}
