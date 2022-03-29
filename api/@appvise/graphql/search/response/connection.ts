import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { Edge, IEdgeType, PageInfo } from '@appvise/graphql';

export interface IConnectionType<TNode, TEdge extends IEdgeType<TNode>> {
  edges: TEdge[];
  nodes: TNode[];
  totalCount: number;
  pageInfo: PageInfo;
}

export function Connection<TEntity, TNode, TEdge extends IEdgeType<TNode>>(
  nodeRef: Type<TNode>,
  customEdgeRef?: Type<TEdge>,
): Type<IConnectionType<TNode, TEdge>> {
  let generatedEdgeRef;

  // Create edge class if no custom edge is provided
  if (!customEdgeRef) {
    @ObjectType(`${nodeRef.name.replace('Node', '')}Edge`)
    abstract class EdgeType extends Edge(nodeRef) {}

    generatedEdgeRef = EdgeType;
  }

  @ObjectType({ isAbstract: true })
  abstract class ConnectionType implements IConnectionType<TNode, TEdge> {
    @Field(() => [customEdgeRef ?? generatedEdgeRef], { nullable: true })
    edges: TEdge[];

    @Field(() => [nodeRef], { nullable: true })
    nodes: TNode[];

    @Field(() => Int)
    totalCount: number;

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }

  return ConnectionType as Type<IConnectionType<TNode, TEdge>>;
}
