import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { OperationType, UploadContractOperation } from '@koiner/chain/domain';

@ObjectType('UploadContractOperation')
export class UploadContractOperationNode extends BaseNode {
  @Field()
  contractId: string;

  @Field()
  bytecode: string;

  @Field({ nullable: true })
  abi: string;

  // Used by UnionTypeResolver
  type: OperationType = OperationType.uploadContract;

  constructor(operation: UploadContractOperation) {
    super(operation);

    this.contractId = operation.contractId.value;
    this.bytecode = operation.bytecode;
    this.abi = operation.abi;
  }
}
