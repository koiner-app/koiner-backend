import { QueryBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { PubSubEngine } from '@koiner/pubsub-engine';
import { Event, EventCreated } from '@koiner/chain/domain';
import { EventQuery } from '@koiner/chain/application';
import { EventNode } from '../dto';

export class PublishEventCreatedEvent extends DomainEventHandler {
  constructor(
    private readonly pubSub: PubSubEngine,
    private readonly queryBus: QueryBus,
  ) {
    super(EventCreated);
  }

  async handle(event: EventCreated): Promise<void> {
    const eventFromDomain = await this.queryBus.execute<EventQuery, Event>(
      new EventQuery(event.aggregateId),
    );

    await this.pubSub.publish('eventCreated', {
      eventCreated: new EventNode(eventFromDomain),
    });
  }
}
