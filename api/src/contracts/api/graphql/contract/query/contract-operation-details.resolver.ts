import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Krc20OperationReadRepository,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { ContractOperationNode } from '@koiner/chain/api/graphql/operation/dto/contract-operation.node';
import { Krc20OperationNode } from '@koiner/contracts/api/graphql/krc20/dto/krc20-operation.node';
import { ContractOperationDetailsUnion } from '@koiner/contracts/api/graphql/contract/dto/contract-operation.union';
import { UnknownContractOperationNode } from '@koiner/contracts/api/graphql/contract/dto/unknown-contract-operation.node';

@Resolver(() => ContractOperationNode)
export class ContractOperationDetailsResolver {
  constructor(
    private readonly krc20OperationReadRepository: Krc20OperationReadRepository,
  ) {}

  @ResolveField(() => ContractOperationDetailsUnion, { nullable: true })
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

    return new UnknownContractOperationNode();
  }
}
