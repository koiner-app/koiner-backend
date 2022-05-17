import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import {
  TokenOperationReadRepository,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { TokenOperationNode } from '@koiner/contracts/api/graphql/token/dto/token-operation.node';
import { ContractOperationDetailsUnion } from '@koiner/contracts/api/graphql/contract/dto/contract-operation.union';
import { ContractOperationNode } from '../dto';

@Resolver(() => ContractOperationNode)
export class ContractOperationDetailsResolver {
  constructor(
    private readonly tokenOperationReadRepository: TokenOperationReadRepository,
  ) {}

  @ResolveField('details', () => ContractOperationDetailsUnion, {
    nullable: true,
  })
  async details(
    @Parent() parent: ContractOperationNode,
  ): Promise<typeof ContractOperationDetailsUnion> {
    if (parent.contractStandardType === ContractStandardType.token) {
      try {
        const operation = await this.tokenOperationReadRepository.findOneById(
          parent.id,
        );

        return new TokenOperationNode(operation);
      } catch (error) {
        console.log('Error', error);
      }
    }

    return null;
  }
}
