import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { ContractStandardType } from '@koiner/contracts/domain';
import { ContractStandardService } from '../../contract-standard/service/contract-standard-service';
import { CreateTokenOperationCommand } from '../..';
import { ContractOperationWithTokenTypeCreatedMessage } from '@koiner/contracts/events';

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
    try {
      const decodedOperation =
        await this.contractStandardService.decodeOperation(
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
    } catch (error) {
      console.log('CreateTokenOperation error', error);
    }
  }
}
