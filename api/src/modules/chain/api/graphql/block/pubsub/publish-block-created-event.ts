import { DomainEventHandler } from '@appvise/domain';
import { Block, BlockCreated } from '@koiner/chain/domain';
import { PubSubEngine } from '@koiner/pubsub-engine';
import { QueryBus } from '@nestjs/cqrs';
import { BlockQuery } from '@koiner/chain/application/block/query';
import { BlockNode } from '@koiner/chain/api/graphql/block/dto/block.node';

export class PublishBlockCreatedEvent extends DomainEventHandler {
  constructor(
    private readonly pubSub: PubSubEngine,
    private readonly queryBus: QueryBus,
  ) {
    super(BlockCreated);
  }

  async handle(event: BlockCreated): Promise<void> {
    const block = await this.queryBus.execute<BlockQuery, Block>(
      new BlockQuery(event.height),
    );

    await this.pubSub.publish('blockCreated', {
      blockCreated: new BlockNode(block),
    });
  }
}
