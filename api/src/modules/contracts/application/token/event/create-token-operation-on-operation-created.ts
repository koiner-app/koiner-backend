import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { ContractOperationCreated } from '@koiner/contracts/domain';
import { CreateTokenOperationCommand } from '@koiner/contracts/application/token/command';
import { ContractStandardType } from '@koiner/contracts/domain';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';

export class CreateTokenOperationOnOperationCreated extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly contractStandardService: ContractStandardService,
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
          event.args,
        );

      await this.commandBus.execute(
        new CreateTokenOperationCommand(
          event.aggregateId,
          event.contractId,
          decodedOperation.name,
          <string>decodedOperation.args.to,
          parseInt(<string>decodedOperation.args.value),
          <string>decodedOperation.args.from,
          event.transactionId,
        ),
      );
    } catch (error) {
      console.log('Token operation error', error);
    }
  }
}
