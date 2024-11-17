import {
  ContractEventWithTokenTypeCreatedMessage,
  ContractWithTokenTypeCreatedMessage,
} from '@koiner/contracts/events';
import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RawBlocksService } from '@koinos/jsonrpc';
import { ContractEventsRequest } from '@koiner/contracts/graphql';
import {
  ContractEventsQuery,
  UpdateContractStandardCommand,
} from '@koiner/contracts/application';
import { ContractEvent } from '@koiner/contracts/domain';
import { SearchResponse, UUID } from '@appvise/domain';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventParentType } from '@koiner/domain';
import { ContractStandardType } from '@koiner/contracts/standards';

@Injectable()
export class KoincityLaunchpadTokenHelper {
  constructor(
    private readonly rawBlocksService: RawBlocksService,
    private readonly amqpConnection: AmqpConnection,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  public async publishEvents(
    transactionId: string,
    blockHeight: number,
    timestamp: number,
    insertEvents: boolean
  ): Promise<void> {
    const txReceipt = await this.rawBlocksService.getTransactionReceipt(
      blockHeight,
      transactionId
    );

    if (!txReceipt || !Array.isArray(txReceipt.events)) {
      console.log('Could not find events for Launchpad operation');
      return;
    }

    const tokenMintEvent = txReceipt.events.find(
      (result) => result.name === 'token.mint_event'
    );

    if (!tokenMintEvent || !tokenMintEvent.source) {
      console.error('Could not find tokenMintEvent');
      return;
    }

    const contractId = tokenMintEvent.source;

    /**
     * Update contract standard to token
     */
    await this.commandBus.execute(
      new UpdateContractStandardCommand({
        id: contractId,
        contractStandardType: ContractStandardType.token,
      })
    );

    /**
     * Trigger creation of token contract
     */
    const message = new ContractWithTokenTypeCreatedMessage({
      contractId,
      contractStandardType: 'kcs-1',
      timestamp: timestamp,
      publishedAt: Date.now(),
    });

    console.log('publishTokenContractEventForLaunchpad', message.toString());

    this.amqpConnection.publish(
      'koiner.contracts.event',
      ContractWithTokenTypeCreatedMessage.eventName,
      message.toString()
    );

    /**
     * Publish tokenMinted event so tokenize service can process it
     */
    if (!insertEvents) {
      setTimeout(async () => {
        const message = new ContractEventWithTokenTypeCreatedMessage({
          eventId: UUID.generate().value,
          blockHeight: blockHeight,
          parentId: transactionId,
          parentType: EventParentType.transaction,
          sequence: tokenMintEvent.sequence,
          contractId: tokenMintEvent.source,
          contractStandardType: 'kcs-1',
          name: tokenMintEvent.name,
          data: tokenMintEvent.data,
          impacted: tokenMintEvent.impacted
            ? tokenMintEvent.impacted.filter(
                (impactedItem) => impactedItem !== '' // Filter out empty items
              )
            : [],
          timestamp: timestamp,
          publishedAt: Date.now(),
        });

        this.amqpConnection.publish(
          'koiner.contracts.event',
          ContractEventWithTokenTypeCreatedMessage.eventName,
          message.toString()
        );
      }, 5000);
    }

    /**
     * Create token events from contract events of this contract
     */
    if (insertEvents) {
      setTimeout(async () => {
        const request = new ContractEventsRequest();
        request.first = 1000;
        request.filter = {
          contractId: { equals: contractId },
        };
        const selectionSet = undefined;

        const searchResponse = await this.queryBus.execute<
          ContractEventsQuery,
          SearchResponse<ContractEvent>
        >(new ContractEventsQuery(request, selectionSet));

        for (const result of searchResponse.results) {
          // Publish tokenMinted event so tokenize service can process it
          const message = new ContractEventWithTokenTypeCreatedMessage({
            eventId: result.item.id.value,
            blockHeight: result.item.blockHeight,
            parentId: result.item.parentId.value,
            parentType: result.item.parentType,
            sequence: result.item.sequence,
            contractId: result.item.contractId.value,
            contractStandardType: 'kcs-1',
            name: result.item.name,
            data: result.item.data,
            impacted: result.item.impacted.map((address) => address.value),
            timestamp: result.item.timestamp,
            publishedAt: Date.now(),
          });

          this.amqpConnection.publish(
            'koiner.contracts.event',
            ContractEventWithTokenTypeCreatedMessage.eventName,
            message.toString()
          );
        }
      }, 5000);
    }
  }
}
