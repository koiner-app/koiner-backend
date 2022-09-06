import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { SearchResponse } from '@appvise/domain';
import {
  ContractEventQuery,
  ContractEventsQuery,
  CreateBlockRewardCommand,
  CreateOrUpdateAddressCommand,
  TokenEventQuery,
} from '@koiner/contracts/application';
import { BlockRewardMintedEventCreatedMessage } from '@koiner/contracts/events';
import { koinos } from '../../config';
import * as math from 'mathjs';
import {
  ContractEvent,
  ContractEventParentType,
  ContractStandardType,
  TokenEvent,
} from '@koiner/contracts/domain';

@Injectable()
export class CreateBlockRewardForNewBlock {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @OnEvent(BlockRewardMintedEventCreatedMessage.routingKey, { async: false })
  async handle(event: BlockRewardMintedEventCreatedMessage): Promise<void> {
    // Fetch parent ContractEvent for retrieving parent block height +
    // fetching koin.mint TokenEvent
    const parentContractEvent = await this.queryBus.execute<
      ContractEventQuery,
      ContractEvent
    >(new ContractEventQuery(event.id));

    // Make sure burn event is a child of a block. Otherwise it not a block reward!
    if (parentContractEvent.parentType === ContractEventParentType.block) {
      const contractEvents = await this.queryBus.execute<
        ContractEventsQuery,
        SearchResponse<ContractEvent>
      >(
        new ContractEventsQuery({
          first: 10,
          filter: {
            parentType: { equals: ContractEventParentType.block },
            blockHeight: { equals: parentContractEvent.blockHeight },
            contractId: { equals: koinos.vhpContractId },
            contractStandardType: { equals: ContractStandardType.token },
            name: { equals: 'vhp.burn' },
          },
        })
      );

      if (contractEvents.results.length === 0) {
        throw new Error('Koin mint event for block reward not found');
      }

      const mintEvent = event;
      const burnEvent = await this.queryBus.execute<
        TokenEventQuery,
        TokenEvent
      >(new TokenEventQuery(contractEvents.results[0].item.id.value));

      const blockProducerId: string = mintEvent.to;
      const producerRewards: number = mintEvent.value;
      const burnedValue = burnEvent.value;

      // Add address for block producer
      await this.commandBus.execute(
        new CreateOrUpdateAddressCommand({
          id: blockProducerId,
          isProducer: true,
        })
      );

      await this.commandBus.execute(
        new CreateBlockRewardCommand({
          blockHeight: parentContractEvent.blockHeight,
          producerId: blockProducerId,
          contractId: koinos.koinContractId,
          value: producerRewards,
          burnedContractId: koinos.vhpContractId,
          burnerId: burnEvent.from.value,
          burnedValue,
          roi: burnedValue
            ? (math
                .chain<number>(producerRewards)
                .divide(burnedValue)
                .multiply(100)
                .subtract(100)
                .round(5)
                .done() as number)
            : undefined,
          timestamp: mintEvent.timestamp,
        })
      );
    }
  }
}
