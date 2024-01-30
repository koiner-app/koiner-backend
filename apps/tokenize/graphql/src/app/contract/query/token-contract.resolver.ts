import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { SelectionSet } from '@appvise/graphql';
import { TokenContractQuery } from '@koiner/tokenize/application';
import { TokenContractNode } from '../dto';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { QueryBus } from '@nestjs/cqrs';
import { TokenContract } from '@koiner/tokenize/domain';
import { TotalSupplyService } from '@koinos/jsonrpc';

@Resolver(() => TokenContractNode)
export class TokenContractResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly totalSupplyService: TotalSupplyService
  ) {}

  @Query(() => TokenContractNode, { name: 'tokenContract' })
  async execute(
    @Args({ name: 'id', type: () => ID }) id: string,
    @SelectionSet() selectionSet: SelectionSetObject
  ): Promise<TokenContractNode> {
    let entity = await this.queryBus.execute<TokenContractQuery, TokenContract>(
      new TokenContractQuery(id, selectionSet)
    );

    if (selectionSet.isSelected('totalSupply')) {
      const onChainSupply = await this.totalSupplyService.getTokenSupply(
        entity.id.value,
        undefined,
        false
      );

      if (onChainSupply > -1) {
        entity = new TokenContract({
          id: entity.id,
          props: {
            ...entity.getPropsCopy(),
            totalSupply: onChainSupply,
          },
        });
      }
    }

    return new TokenContractNode(entity);
  }
}
