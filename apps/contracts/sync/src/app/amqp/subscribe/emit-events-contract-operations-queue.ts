import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  OperationCreatedMessage,
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
      OperationCreatedMessage.routingKey,
      `${UploadContractOperationCreatedMessage.routingKey}.operations_queue`,
    ],
    queue: 'koiner.contracts.queue.contract.operations',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      let event:
        | OperationCreatedMessage
        | UploadContractOperationCreatedMessage;
      let routingKey = amqpMsg.fields.routingKey;

      if (routingKey === OperationCreatedMessage.routingKey) {
        event = new OperationCreatedMessage(JSON.parse(message));
      }

      if (
        routingKey ===
        `${UploadContractOperationCreatedMessage.routingKey}.operations_queue`
      ) {
        routingKey = UploadContractOperationCreatedMessage.routingKey;
        event = new UploadContractOperationCreatedMessage(JSON.parse(message));
      }

      if (event instanceof OperationCreatedMessage) {
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

        const wait = (ms) =>
          new Promise<void>((resolve) => {
            setTimeout(() => resolve(), ms);
          });

        const retryWithDelay = (
          operation,
          retries = 3,
          delay = 2000,
          finalErr = 'Retry failed'
        ) => {
          console.log('ATTEMPT', retries);
          return new Promise((resolve, reject) => {
            return operation.then(resolve).catch(() => {
              // If retries are left
              if (retries > 0) {
                // Delay the next call
                return (
                  wait(delay)
                    // Recursively call the same function to retry with max retries - 1
                    .then(
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      retryWithDelay.bind(
                        null,
                        operation,
                        retries - 1,
                        delay,
                        finalErr
                      )
                    )
                    .then(resolve)
                    .catch(reject)
                );
              }

              // Throw final error
              return reject(finalErr);
            });
          });
        };

        console.log('Try fetching ' + contractId);

        retryWithDelay(
          this.queryBus.execute<ContractQuery, Contract>(
            new ContractQuery(contractId)
          ),
          50,
          5000
        )
          .then(() => {
            console.log(`Contract found ${contractId}`);
            resolve();
          })
          .catch((error) => {
            console.log(`Could not fetch contract ${contractId}`, error);
            resolve();
          });
      }
    });
  }
}
