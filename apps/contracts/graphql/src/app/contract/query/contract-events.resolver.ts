import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { ContractEvent } from '@koiner/contracts/domain';
import { ContractEventsQuery } from '@koiner/contracts/application';
import {
  ContractEventNode,
  ContractEventsConnection,
  ContractEventsRequest,
} from '../dto';

@Resolver(() => ContractEventNode)
export class ContractEventsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => ContractEventsConnection, { name: 'contractEvents' })
  async execute(
    @Args() request: ContractEventsRequest,
    @SelectionSet() selectionSet
  ): Promise<ContractEventsConnection> {
    const searchResponse = await this.queryBus.execute<
      ContractEventsQuery,
      SearchResponse<ContractEvent>
    >(new ContractEventsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      ContractEventsConnection,
      ContractEventNode,
      searchResponse,
      selectionSet
    );
  }
}
