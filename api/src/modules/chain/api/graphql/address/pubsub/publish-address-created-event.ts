import { DomainEventHandler } from '@appvise/domain';
import { Address, AddressCreated } from '@koiner/chain/domain';
import { PubSubEngine } from '@koiner/pubsub-engine';
import { QueryBus } from '@nestjs/cqrs';
import { AddressQuery } from '@koiner/chain/application';
import { AddressNode } from '../dto';

export class PublishAddressCreatedEvent extends DomainEventHandler {
  constructor(
    private readonly pubSub: PubSubEngine,
    private readonly queryBus: QueryBus,
  ) {
    super(AddressCreated);
  }

  async handle(event: AddressCreated): Promise<void> {
    const address = await this.queryBus.execute<AddressQuery, Address>(
      new AddressQuery(event.aggregateId),
    );

    await this.pubSub.publish('addressCreated', {
      addressCreated: new AddressNode(address),
    });
  }
}
