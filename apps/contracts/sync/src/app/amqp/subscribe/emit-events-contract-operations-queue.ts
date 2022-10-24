import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ContractOperationCreatedMessage,
  UploadContractOperationCreatedMessage,
} from '@koiner/chain/events';
import { ContractQuery } from '@koiner/contracts/application';
import { Contract } from '@koiner/contracts/domain';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class EmitEventsContractOperationsQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.channel.contract.operations',
    },
    exchange: 'koiner.chain.event',
    routingKey: [
      ContractOperationCreatedMessage.routingKey,
      `${UploadContractOperationCreatedMessage.routingKey}.operations_queue`,
    ],
    queue: 'koiner.contracts.queue.contract.operations',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      let event:
        | ContractOperationCreatedMessage
        | UploadContractOperationCreatedMessage;
      let routingKey = amqpMsg.fields.routingKey;

      if (routingKey === ContractOperationCreatedMessage.routingKey) {
        event = new ContractOperationCreatedMessage(JSON.parse(message));
      }

      if (
        routingKey ===
        `${UploadContractOperationCreatedMessage.routingKey}.operations_queue`
      ) {
        routingKey = UploadContractOperationCreatedMessage.routingKey;
        event = new UploadContractOperationCreatedMessage(JSON.parse(message));
      }

      if (event instanceof ContractOperationCreatedMessage) {
        this.eventEmitter
          .emitAsync(routingKey, event)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            this.logger.error(
              'Could not process koiner.contracts.queue.contract.operations message',
              error
            );
            reject();
          });
      } else {
        // UploadContractOperationCreatedMessage is sent to both the .events_queue + this .operations_queue.
        // To prevent read/write conflicts we need to check if the contract has been processed by the .events_queue
        // before going to the next item in queue. It's not ideal but this way we can have 2 separate queues processing
        // contract events + operations.
        const contractId = event.contractId;

        this.queryBus
          .execute<ContractQuery, Contract>(new ContractQuery(contractId))
          .then(() => {
            resolve();
          })
          .catch(() => {
            // The contract has not yet been processed by the events queue.
            // Reject this message and requeue it with a small delay
            setTimeout(() => {
              reject();
            }, 1000);
          });
      }
    });
  }
}
