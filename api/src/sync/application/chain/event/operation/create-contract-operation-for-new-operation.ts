import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import { CreateContractOperationCommand } from '@koiner/chain/application/operation/command';
import { RawBlocksService } from '@koiner/sync/raw-blocks.service';
import { ContractQuery } from '@koiner/contracts/application/contract/query';
import { Contract } from '@koiner/contracts/domain';

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
        new CreateContractOperationCommand(
          event.aggregateId,
          contractId,
          rawOperation.call_contract.entry_point,
          rawOperation.call_contract.args,
          contractStandardType,
        ),
      );
    }
  }
}
