import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OperationNode } from '@koiner/chain/api/graphql/operation/dto/operation.node';
import { OperationDetailsUnion } from '@koiner/chain/api/graphql/operation/dto/operation-details.union';
import { OperationTypeResolver } from '@koiner/chain/api/graphql/operation/query/operation-type.resolver';

@Resolver(() => OperationNode)
export class OperationDetailsResolver {
  constructor(
    @Inject('OperationTypeResolvers')
    private readonly operationTypeResolvers: OperationTypeResolver[],
  ) {}

  @ResolveField('details', () => OperationDetailsUnion, {
    nullable: true,
  })
  async details(
    @Parent() operation: OperationNode,
  ): Promise<typeof OperationDetailsUnion> {
    const resolvers = this.operationTypeResolvers ?? [];

    for (const resolver of resolvers) {
      if (await resolver.supports(operation)) {
        return await resolver.resolve(operation);
      }
    }

    return null;
  }
}
