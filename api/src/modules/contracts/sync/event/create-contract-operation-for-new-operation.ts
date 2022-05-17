import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { RawBlocksService } from '@koinos/raw-blocks.service';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import { Contract } from '@koiner/contracts/domain';
import {
  ContractQuery,
  CreateContractOperationCommand,
} from '@koiner/contracts/application';

export class CreateContractOperationForNewOperation extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly rawBlocksService: RawBlocksService,
  ) {
    super(OperationCreated);
  }

  async handle(event: OperationCreated): Promise<void> {
    if (event.type === OperationType.contractOperation) {
      const rawOperation = await this.rawBlocksService.getOperation(
        event.blockHeight,
        event.transactionId,
        event.operationIndex,
      );

      const contractId = rawOperation.call_contract.contract_id;
      let contractStandardType = undefined;

      try {
        const contract = await this.queryBus.execute<ContractQuery, Contract>(
          new ContractQuery(contractId),
        );

        contractStandardType = contract.contractStandardType;
      } catch {}

      await this.commandBus.execute(
        new CreateContractOperationCommand({
          id: event.aggregateId,
          contractId,
          transactionId: event.transactionId,
          entryPoint: rawOperation.call_contract.entry_point,
          args: rawOperation.call_contract.args,
          contractStandardType,
        }),
      );
    }
  }
}
