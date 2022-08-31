import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { RawBlocksService } from '@koinos/jsonrpc';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import { CreateSystemCallOperationCommand } from '@koiner/chain/application';

export class CreateSystemCallOperationForNewOperation extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService
  ) {
    super(OperationCreated);
  }

  async handle(event: OperationCreated): Promise<void> {
    if (event.type === OperationType.systemCall) {
      const rawOperation = await this.rawBlocksService.getOperation(
        event.blockHeight,
        event.transactionId,
        event.operationIndex
      );

      await this.commandBus.execute(
        new CreateSystemCallOperationCommand({
          id: event.aggregateId,
          contractId:
            rawOperation.set_system_call.target.system_call_bundle.contract_id,
          callId: rawOperation.set_system_call.call_id,
          timestamp: event.timestamp,
        })
      );
    }
  }
}
