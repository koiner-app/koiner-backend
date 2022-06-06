import { QueryBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { Block } from '@koiner/chain/domain';
import { PubSubEngine } from '@koiner/nestjs-utils';
import { BlockQuery } from '@koiner/chain/application';
// TODO: Import from shared module
import { BlockNode } from '@koiner/chain/graphql';
import { BlockCreated } from '@koiner/chain/domain';

export class PublishBlockCreatedEvent extends DomainEventHandler {
  constructor(
    private readonly pubSub: PubSubEngine,
    private readonly queryBus: QueryBus
  ) {
    super(BlockCreated);
  }

  async handle(event: BlockCreated): Promise<void> {
    const block = await this.queryBus.execute<BlockQuery, Block>(
      new BlockQuery(event.height)
    );

    await this.pubSub.publish('blockCreated', {
      blockCreated: new BlockNode(block),
    });
  }
}
