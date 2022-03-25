import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UnknownContractOperation')
export class UnknownContractOperationNode {
  @Field()
  unknownOperation: boolean;

  constructor() {
    this.unknownOperation = true;
  }
}
