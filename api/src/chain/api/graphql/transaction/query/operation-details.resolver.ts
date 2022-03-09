import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OperationDetailsUnion } from '@koiner/chain/api/graphql/transaction/dto/operation.union';
import { OperationNode } from '@koiner/chain/api/graphql/transaction/dto/operation.node';
import { Krc20OperationReadRepository } from '@koiner/contracts/domain';
import { Krc20OperationNode } from '@koiner/contracts/api/graphql/krc20/dto/krc20-operation.node';
import {
  ContractOperationReadRepository,
  OperationType,
  UploadContractOperationReadRepository,
} from '@koiner/chain/domain';
import { UploadContractOperationNode } from '@koiner/chain/api/graphql/operation/dto/upload-contract-operation.node';
import { ContractOperationNode } from '@koiner/chain/api/graphql/operation/dto/contract-operation.node';

@Resolver((of) => OperationNode)
export class OperationDetailsResolver {
  constructor(
    private krc20OperationReadRepository: Krc20OperationReadRepository,
    private uploadContractOperationReadRepository: UploadContractOperationReadRepository,
    private operationReadRepository: ContractOperationReadRepository,
  ) {}

  @ResolveField((returns) => OperationDetailsUnion)
  async details(
    @Parent() parent: OperationNode,
  ): Promise<typeof OperationDetailsUnion> {
    if (parent.type === OperationType.contractOperation) {
      // TODO: Add OperationType.krc20Operation
      try {
        const operation = await this.krc20OperationReadRepository.findOneById(
          parent.id,
        );

        return new Krc20OperationNode(operation);
      } catch (error) {
        console.log('Error', error);
      }
    }

    if (parent.type === OperationType.uploadContract) {
      try {
        const operation =
          await this.uploadContractOperationReadRepository.findOneById(
            parent.id,
          );

        return new UploadContractOperationNode(operation);
      } catch (error) {
        console.log('Error', error);
      }
    }

    if (parent.type === OperationType.contractOperation) {
      try {
        const operation = await this.operationReadRepository.findOneById(
          parent.id,
        );

        return new ContractOperationNode(operation);
      } catch (error) {
        console.log('Error', error);
      }
    }
  }
}
