import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SelectionSet } from '@appvise/graphql';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { BlockQuery } from '@koiner/chain/application/block/query';
import { BlockNode } from '@koiner/chain/api/graphql/block/dto/block.node';
import { Block } from '@koiner/chain/domain';

@Resolver(() => BlockNode)
export class BlockResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => BlockNode, { name: 'block' })
  async execute(
    @Args({ name: 'height', type: () => ID }) id: number,
    @SelectionSet() selectionSet: SelectionSetObject,
  ): Promise<BlockNode> {
    const entity = await this.queryBus.execute<BlockQuery, Block>(
      new BlockQuery(id, selectionSet),
    );

    return new BlockNode(entity);
  }
}
