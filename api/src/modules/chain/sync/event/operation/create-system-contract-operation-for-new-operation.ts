import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import { CreateSystemContractOperationCommand } from '@koiner/chain/application';
import { RawBlocksService } from '@koinos/raw-blocks.service';

export class CreateSystemContractOperationForNewOperation extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService,
  ) {
    super(OperationCreated);
  }

  async handle(event: OperationCreated): Promise<void> {
    if (event.type === OperationType.systemContract) {
      const rawOperation = await this.rawBlocksService.getOperation(
        event.blockHeight,
        event.transactionId,
        event.operationIndex,
      );

      await this.commandBus.execute(
        new CreateSystemContractOperationCommand({
          id: event.aggregateId,
          contractId: rawOperation.set_system_contract.contract_id,
          systemContract: rawOperation.set_system_contract.system_contract,
        }),
      );
    }
  }
}
