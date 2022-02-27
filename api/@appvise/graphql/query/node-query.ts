import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SelectionSet } from '@appvise/graphql';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';

export function NodeQuery<TEntity, TNode, TQuery>(
  nodeType: new (entity: TEntity) => TNode,
  queryType: new (
    identifier: string,
    selectionSet?: SelectionSetObject,
  ) => TQuery,
  queryName: string,
): any {
  @Resolver(() => nodeType, { isAbstract: true })
  abstract class NodeQueryResolver {
    protected constructor(private readonly queryBus: QueryBus) {}

    @Query(() => nodeType, { name: queryName })
    async execute(
      @Args({ name: 'id', type: () => ID }) id: string,
      @SelectionSet() selectionSet: SelectionSetObject,
    ): Promise<TNode> {
      const entity = await this.queryBus.execute<TQuery, TEntity>(
        new queryType(id, selectionSet),
      );

      return new nodeType(entity);
    }
  }

  return NodeQueryResolver;
}
