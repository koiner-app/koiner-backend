import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import { CreateSystemContractOperationCommand } from '@koiner/chain/application';
import { SetSystemContractOperationJson } from 'koilib/lib/interface';

export class CreateSystemContractOperationForNewOperation extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(OperationCreated);
  }

  async handle(event: OperationCreated): Promise<void> {
    if (
      event.type === OperationType.systemContract &&
      event.operationData.set_system_contract
    ) {
      const operationJson: SetSystemContractOperationJson =
        event.operationData.set_system_contract;

      await this.commandBus.execute(
        new CreateSystemContractOperationCommand({
          id: event.aggregateId,
          contractId: operationJson.contract_id,
          systemContract: operationJson.system_contract,
          timestamp: event.timestamp,
        })
      );
    }
  }
}
