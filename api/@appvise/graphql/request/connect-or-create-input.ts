import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IConnectOrCreateInput<CreateInputType> {
  connect: string;
  create: any;
}

export function ConnectOrCreateInput<CreateInputType>(
  createInput: Type<CreateInputType>,
): any {
  @InputType({ isAbstract: true })
  abstract class ConnectOrCreateInputType
    implements IConnectOrCreateInput<CreateInputType>
  {
    @Field((type) => ID)
    connect: string;

    @Field((type) => createInput)
    create: CreateInputType;
  }

  return ConnectOrCreateInputType; // as IConnectOrCreateInput<CreateInputType>;
}
