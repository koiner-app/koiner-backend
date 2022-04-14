import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { ContractOperationCreated, Operation } from '@koiner/chain/domain';
import { CreateKrc20OperationCommand } from '@koiner/contracts/application/krc20/command';
import { ContractStandardType } from '@koiner/contracts/domain';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';
import { OperationQuery } from '@koiner/chain/application/operation/query';

export class CreateKrcOperationOnOperationCreated extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly contractStandardService: ContractStandardService,
  ) {
    super(ContractOperationCreated);
  }

  async handle(event: ContractOperationCreated): Promise<void> {
    if (event.contractStandardType !== ContractStandardType.krc20) {
      return;
    }

    try {
      // Fetch parent operation to retrieve the transactionId
      const operation = await this.queryBus.execute<OperationQuery, Operation>(
        new OperationQuery(event.aggregateId),
      );

      const decodedOperation =
        await this.contractStandardService.decodeOperation(
          event.contractStandardType,
          event.contractId,
          event.entryPoint,
          event.args,
        );

      await this.commandBus.execute(
        new CreateKrc20OperationCommand(
          event.aggregateId,
          event.contractId,
          decodedOperation.name,
          <string>decodedOperation.args.to,
          parseInt(<string>decodedOperation.args.value),
          <string>decodedOperation.args.from,
          operation.transactionId.value,
        ),
      );
    } catch (error) {
      console.log('Krc20 operation error', error);
    }
  }
}
