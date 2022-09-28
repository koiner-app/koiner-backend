import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OperationType } from '@koiner/chain/domain';
import { Contract } from '@koiner/contracts/domain';
import {
  ContractQuery,
  CreateContractOperationCommand,
} from '@koiner/contracts/application';
import { OperationCreatedMessage } from '@koiner/chain/events';
import { CallContractOperationJson } from 'koilib/lib/interface';

@Injectable()
export class CreateContractOperationForNewOperation {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @OnEvent(OperationCreatedMessage.routingKey, { async: false })
  async handle(event: OperationCreatedMessage): Promise<void> {
    if (
      event.type === OperationType.contractOperation &&
      event.operationData['call_contract']
    ) {
      const operationJson: CallContractOperationJson =
        event.operationData['call_contract'];

      const contractId = operationJson.contract_id;
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
          blockHeight: event.blockHeight,
          contractId,
          transactionId: event.transactionId,
          entryPoint: operationJson.entry_point,
          args: operationJson.args,
          contractStandardType,
          timestamp: event.timestamp,
        })
      );
    }
  }
}
