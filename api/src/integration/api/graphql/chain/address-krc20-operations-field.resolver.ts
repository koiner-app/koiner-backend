import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SearchResponse } from '@appvise/domain';
import { ConnectionFactory, SelectionSet } from '@appvise/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { AddressNode } from '@koiner/chain/api/graphql/address/dto/address.node';
import { Krc20Operation } from '@koiner/contracts/domain';
import { Krc20OperationsRequest } from '@koiner/contracts/api/graphql/krc20/dto/krc20-operations.request';
import { Krc20OperationsQuery } from '@koiner/contracts/application/krc20/query';
import { Krc20OperationsConnection } from '@koiner/contracts/api/graphql/krc20/dto/krc20-operations.connection';
import { Krc20OperationNode } from '@koiner/contracts/api/graphql/krc20/dto/krc20-operation.node';

@Resolver(() => AddressNode)
export class AddressKrc20OperationsFieldResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @ResolveField('krc20Operations', () => Krc20OperationsConnection)
  async krc20Operations(
    @Parent() address: AddressNode,
    @Args() request: Krc20OperationsRequest,
    @SelectionSet() selectionSet,
  ): Promise<Krc20OperationsConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.OR = [
      {
        from: { equals: address.id },
      },
      {
        to: { equals: address.id },
      },
    ];

    const searchResponse = await this.queryBus.execute<
      Krc20OperationsQuery,
      SearchResponse<Krc20Operation>
    >(new Krc20OperationsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      Krc20OperationsConnection,
      Krc20OperationNode,
      searchResponse,
      selectionSet,
    );
  }
}
