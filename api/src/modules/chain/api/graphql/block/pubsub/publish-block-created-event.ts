import { DomainEventHandler } from '@appvise/domain';
import { Block } from '@koiner/chain/domain';
import { PubSubEngine } from '@koiner/pubsub-engine';
import { QueryBus } from '@nestjs/cqrs';
import { BlockQuery } from '@koiner/chain/application';
import { BlockNode } from '@koiner/chain/api/graphql/block/dto/block.node';
import { BlockRewardCreated } from '@koiner/contracts/domain';

export class PublishBlockCreatedEvent extends DomainEventHandler {
  constructor(
    private readonly pubSub: PubSubEngine,
    private readonly queryBus: QueryBus,
  ) {
    super(BlockRewardCreated);
  }

  async handle(event: BlockRewardCreated): Promise<void> {
    const block = await this.queryBus.execute<BlockQuery, Block>(
      new BlockQuery(event.blockHeight),
    );

    await this.pubSub.publish('blockCreated', {
      blockCreated: new BlockNode(block),
    });
  }
}
