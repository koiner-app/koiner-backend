import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OperationDetailsUnion } from '@koiner/chain/api/graphql/operation/dto/operation.union';
import { OperationNode } from '@koiner/chain/api/graphql/operation/dto/operation.node';
import {
  ContractOperationReadRepository,
  OperationType,
  SystemCallOperationReadRepository,
  SystemContractOperationReadRepository,
  UploadContractOperationReadRepository,
} from '@koiner/chain/domain';
import { UploadContractOperationNode } from '@koiner/chain/api/graphql/operation/dto/upload-contract-operation.node';
import { ContractOperationNode } from '@koiner/chain/api/graphql/operation/dto/contract-operation.node';
import { SystemCallOperationNode } from '@koiner/chain/api/graphql/operation/dto/system-call-operation.node';
import { SystemContractOperationNode } from '@koiner/chain/api/graphql/operation/dto/system-contract-operation.node';

@Resolver(() => OperationNode)
export class OperationDetailsResolver {
  constructor(
    private readonly uploadContractOperationReadRepository: UploadContractOperationReadRepository,
    private readonly operationReadRepository: ContractOperationReadRepository,
    private readonly systemCallOperationRepository: SystemCallOperationReadRepository,
    private readonly systemContractOperationReadRepository: SystemContractOperationReadRepository,
  ) {}

  @ResolveField('details', () => OperationDetailsUnion)
  async details(
    @Parent() parent: OperationNode,
  ): Promise<typeof OperationDetailsUnion> {
    if (parent.type === OperationType.systemCall) {
      try {
        const operation = await this.systemCallOperationRepository.findOneById(
          parent.id,
        );

        return new SystemCallOperationNode(operation);
      } catch (error) {
        console.log('Error', error);
      }
    }

    if (parent.type === OperationType.systemContractOperation) {
      try {
        const operation =
          await this.systemContractOperationReadRepository.findOneById(
            parent.id,
          );

        return new SystemContractOperationNode(operation);
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
