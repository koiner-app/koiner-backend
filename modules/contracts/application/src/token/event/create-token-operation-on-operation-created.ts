import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import {
  ContractOperationCreated,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { ContractStandardService, CreateTokenOperationCommand } from '../..';

export class CreateTokenOperationOnOperationCreated extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly contractStandardService: ContractStandardService
  ) {
    super(ContractOperationCreated);
  }

  async handle(event: ContractOperationCreated): Promise<void> {
    if (event.contractStandardType !== ContractStandardType.token) {
      return;
    }

    try {
      const decodedOperation =
        await this.contractStandardService.decodeOperation(
          event.contractStandardType,
          event.contractId,
          event.entryPoint,
          event.args
        );

      await this.commandBus.execute(
        new CreateTokenOperationCommand({
          id: event.aggregateId,
          contractId: event.contractId,
          transactionId: event.transactionId,
          name: decodedOperation.name,
          to: <string>decodedOperation.args.to,
          value: parseInt(<string>decodedOperation.args.value),
          from: <string>decodedOperation.args.from,
        })
      );
    } catch (error) {
      console.log('Token operation error', error);
    }
  }
}
