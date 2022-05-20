import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SelectionSet } from '@appvise/graphql';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { Block } from '@koiner/chain/domain';
import { BlockQuery } from '@koiner/chain/application';
import { BlockNode } from '../dto';

@Resolver(() => BlockNode)
export class BlockResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => BlockNode, { name: 'block' })
  async execute(
    @Args({ name: 'height', type: () => ID }) height: number,
    @SelectionSet() selectionSet: SelectionSetObject,
  ): Promise<BlockNode> {
    const block = await this.queryBus.execute<BlockQuery, Block>(
      new BlockQuery(height, selectionSet),
    );

    return new BlockNode(block);
  }
}
