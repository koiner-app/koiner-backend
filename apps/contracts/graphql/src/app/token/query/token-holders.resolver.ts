import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { TokenHolder } from '@koiner/contracts/domain';
import { TokenHoldersQuery } from '@koiner/contracts/application';
import {
  TokenHolderNode,
  TokenHoldersConnection,
  TokenHoldersRequest,
} from '../dto';

@Resolver(() => TokenHolderNode)
export class TokenHoldersResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => TokenHoldersConnection, { name: 'tokenHolders' })
  async execute(
    @Args() request: TokenHoldersRequest,
    @SelectionSet() selectionSet
  ): Promise<TokenHoldersConnection> {
    const searchResponse = await this.queryBus.execute<
      TokenHoldersQuery,
      SearchResponse<TokenHolder>
    >(
      new TokenHoldersQuery(request, selectionSet, ['addressId', 'contractId'])
    );

    return ConnectionFactory.fromSearchResponse(
      TokenHoldersConnection,
      TokenHolderNode,
      searchResponse,
      selectionSet
    );
  }
}
