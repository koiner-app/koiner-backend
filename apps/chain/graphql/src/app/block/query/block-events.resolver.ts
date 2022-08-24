import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SelectionSet } from '@appvise/graphql';
import { BlockNode } from '../dto/block.node';
import { EventsRequest } from '../../event';
import { EventsConnection } from '../../event';
import { EventsResolver } from '../../event/query';
import { EventParentType } from '@koiner/chain/domain';

@Resolver(() => BlockNode)
export class BlockEventsResolver {
  constructor(private eventsResolver: EventsResolver) {}

  @ResolveField('events', () => EventsConnection)
  async events(
    @Parent() block: BlockNode,
    @Args() request: EventsRequest,
    @SelectionSet() selectionSet
  ): Promise<EventsConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.parentId = { equals: block.id };
    request.filter.parentType = { equals: EventParentType.block };

    return this.eventsResolver.execute(request, selectionSet);
  }
}
