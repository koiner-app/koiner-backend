import {
  ContractEventWithTokenTypeCreatedMessage,
  ContractWithTokenTypeCreatedMessage,
} from '@koiner/contracts/events';
import { EventParentType } from '@koiner/domain';
import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RawBlocksService } from '@koinos/jsonrpc';
import { UUID } from '@appvise/domain';

@Injectable()
export class KoincityLaunchpadTokenHelper {
  constructor(
    private readonly rawBlocksService: RawBlocksService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  public async publishEvents(
    transactionId: string,
    blockHeight: number,
    timestamp: number
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

    setTimeout(async () => {
      // Publish tokenMinted event so tokenize service can process it
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
}
