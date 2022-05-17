import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { ContractNode } from '.';

@ObjectType()
export class ContractsConnection extends Connection(ContractNode) {}
