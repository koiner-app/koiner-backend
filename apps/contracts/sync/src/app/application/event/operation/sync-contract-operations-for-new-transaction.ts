import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { RawBlocksService } from '@koinos/jsonrpc';
import { TransactionCreatedMessage } from '@koiner/chain/events';
import { CallContractOperationJson } from 'koilib/lib/interface';
import {
  ContractQuery,
  CreateContractOperationCommand,
} from '@koiner/contracts/application';
import { Contract } from '@koiner/contracts/domain';

@Injectable()
export class SyncContractOperationsForNewTransaction {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly rawBlocksService: RawBlocksService
  ) {}

  @OnEvent(`${TransactionCreatedMessage.routingKey}.operation_queue`, {
    async: false,
  })
  async handle(event: TransactionCreatedMessage): Promise<void> {
    const rawTransaction = await this.rawBlocksService.getTransaction(
      event.blockHeight,
      event.id
    );

    if (Array.isArray(rawTransaction.operations)) {
      for (
        let operationIndex = 0;
        operationIndex < rawTransaction.operations.length;
        operationIndex++
      ) {
        const operation = rawTransaction.operations[operationIndex];

        if (operation.call_contract) {
          const operationJson: CallContractOperationJson =
            operation.call_contract;

          const contractId = operationJson.contract_id;
          let contractStandardType = undefined;

          const contract = await this.queryBus.execute<ContractQuery, Contract>(
            new ContractQuery(contractId)
          );

          contractStandardType = contract.contractStandardType;

          await this.commandBus.execute(
            new CreateContractOperationCommand({
              id: UUID.generate().value,
              blockHeight: event.blockHeight,
              contractId,
              transactionId: event.id,
              entryPoint: operationJson.entry_point,
              args: operationJson.args,
              contractStandardType,
              timestamp: event.timestamp,
            })
          );
        }
      }
    }
  }
}
