import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SelectionSet } from '@appvise/graphql';
import { TransactionNode } from '../dto/transaction.node';
import { EventsRequest } from '../../event';
import { EventsConnection } from '../../event';
import { EventsResolver } from '../../event/query';
import { EventParentType } from '@koiner/chain/domain';

@Resolver(() => TransactionNode)
export class TransactionEventsResolver {
  constructor(private eventsResolver: EventsResolver) {}

  @ResolveField('events', () => EventsConnection)
  async events(
    @Parent() transaction: TransactionNode,
    @Args() request: EventsRequest,
    @SelectionSet() selectionSet
  ): Promise<EventsConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.parentId = { equals: transaction.id };
    request.filter.parentType = { equals: EventParentType.transaction };

    return this.eventsResolver.execute(request, selectionSet);
  }
}
