import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { SearchResult } from '@appvise/search';

export interface IEdgeType<TNode> {
  cursor: string;
  node: TNode;
}

export function Edge<TEntity, TNode>(
  nodeRef: Type<TNode>,
): Type<IEdgeType<TNode>> {
  @ObjectType({ isAbstract: true })
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => nodeRef)
    node: TNode;

    protected constructor(searchResult: SearchResult<TEntity>, node: TNode) {
      this.cursor = searchResult.cursor;
      this.node = node;
    }
  }

  return EdgeType as Type<IEdgeType<TNode>>;
}
