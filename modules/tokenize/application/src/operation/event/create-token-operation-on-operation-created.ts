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

  @OnEvent(ContractOperationWithTokenTypeCreatedMessage.routingKey, {
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
      ContractStandardType.token,
      event.contractId,
      event.entryPoint,
      event.args
    );

    await this.commandBus.execute(
      new CreateTokenOperationCommand({
        id: event.operationId,
        contractId: event.contractId,
        transactionId: event.transactionId,
        name: decodedOperation.name,
        from: <string>decodedOperation.args.from,
        to: <string>decodedOperation.args.to,
        value: parseInt(<string>decodedOperation.args.value),
        timestamp: event.timestamp,
      })
    );
  }
}
