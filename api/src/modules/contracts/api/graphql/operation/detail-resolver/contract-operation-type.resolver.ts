import { Injectable } from '@nestjs/common';
import { OperationType } from '@koiner/chain/domain';
import { OperationTypeResolver } from '@koiner/chain/api/graphql/operation/query/operation-type.resolver';
import { OperationDetailsUnion } from '@koiner/chain/api/graphql/operation/dto/operation-details.union';
import { OperationNode } from '@koiner/chain/api/graphql/operation/dto/operation.node';
import { ContractOperationsLoader } from '../dataloader/contract-operations.loader';

@Injectable()
export class ContractOperationTypeResolver implements OperationTypeResolver {
  constructor(private readonly loader: ContractOperationsLoader) {}

  resolve(operation: OperationNode): Promise<typeof OperationDetailsUnion> {
    return this.loader.batch.load(operation.id);
  }

  supports(operation: OperationNode): Promise<boolean> {
    return Promise.resolve(operation.type === OperationType.contractOperation);
  }
}
