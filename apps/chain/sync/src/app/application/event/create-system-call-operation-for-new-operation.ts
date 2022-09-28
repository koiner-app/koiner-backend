import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import { CreateSystemCallOperationCommand } from '@koiner/chain/application';
import { SetSystemCallOperationJson } from 'koilib/lib/interface';

export class CreateSystemCallOperationForNewOperation extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(OperationCreated);
  }

  async handle(event: OperationCreated): Promise<void> {
    if (
      event.type === OperationType.systemCall &&
      event.operationData.set_system_call
    ) {
      const operationJson: SetSystemCallOperationJson =
        event.operationData.set_system_call;

      await this.commandBus.execute(
        new CreateSystemCallOperationCommand({
          id: event.aggregateId,
          contractId: operationJson.target.system_call_bundle.contract_id,
          callId: operationJson.call_id,
          timestamp: event.timestamp,
        })
      );
    }
  }
}
