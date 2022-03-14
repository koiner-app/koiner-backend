import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Krc20OperationReadRepository,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { ContractOperationNode } from '@koiner/chain/api/graphql/operation/dto/contract-operation.node';
import { Krc20OperationNode } from '@koiner/contracts/api/graphql/krc20/dto/krc20-operation.node';
import { ContractOperationDetailsUnion } from '@koiner/contracts/api/graphql/contract/dto/contract-operation.union';

@Resolver((of) => ContractOperationNode)
export class ContractOperationDetailsResolver {
  constructor(
    private readonly krc20OperationReadRepository: Krc20OperationReadRepository,
  ) {}

  @ResolveField((returns) => ContractOperationDetailsUnion)
  async details(
    @Parent() parent: ContractOperationNode,
  ): Promise<typeof ContractOperationDetailsUnion> {
    if (parent.contractStandardType === ContractStandardType.krc20) {
      try {
        const operation = await this.krc20OperationReadRepository.findOneById(
          parent.id,
        );

        return new Krc20OperationNode(operation);
      } catch (error) {
        console.log('Error', error);
      }
    }
  }
}
