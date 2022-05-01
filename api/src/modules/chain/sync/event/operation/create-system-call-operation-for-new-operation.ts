import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import { CreateSystemCallOperationCommand } from '@koiner/chain/application/operation/command';
import { RawBlocksService } from '@koinos/raw-blocks.service';

export class CreateSystemCallOperationForNewOperation extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService,
  ) {
    super(OperationCreated);
  }

  async handle(event: OperationCreated): Promise<void> {
    if (event.type === OperationType.systemCall) {
      const rawOperation = await this.rawBlocksService.getOperation(
        event.blockHeight,
        event.transactionId,
        event.operationIndex,
      );

      await this.commandBus.execute(
        new CreateSystemCallOperationCommand(
          event.aggregateId,
          rawOperation.set_system_call.target.system_call_bundle.contract_id,
          rawOperation.set_system_call.call_id,
        ),
      );
    }
  }
}
