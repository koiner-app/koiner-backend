import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RawBlocksService } from '@koinos/jsonrpc';
import { OperationType } from '@koiner/chain/domain';
import { Contract } from '@koiner/contracts/domain';
import {
  ContractQuery,
  CreateContractOperationCommand,
} from '@koiner/contracts/application';
import { OperationCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class CreateContractOperationForNewOperation {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly rawBlocksService: RawBlocksService
  ) {}

  @OnEvent(OperationCreatedMessage.routingKey, { async: false })
  async handle(event: OperationCreatedMessage): Promise<void> {
    if (event.type === OperationType.contractOperation) {
      const rawOperation = await this.rawBlocksService.getOperation(
        event.blockHeight,
        event.transactionId,
        event.operationIndex
      );

      const contractId = rawOperation.call_contract.contract_id;
      let contractStandardType = undefined;

      try {
        const contract = await this.queryBus.execute<ContractQuery, Contract>(
          new ContractQuery(contractId)
        );

        contractStandardType = contract.contractStandardType;
      } catch {
        //
      }

      await this.commandBus.execute(
        new CreateContractOperationCommand({
          id: event.operationId,
          contractId,
          transactionId: event.transactionId,
          entryPoint: rawOperation.call_contract.entry_point,
          args: rawOperation.call_contract.args,
          contractStandardType,
        })
      );
    }
  }
}
