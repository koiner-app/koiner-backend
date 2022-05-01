import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { ContractNode } from './contract.node';

@ObjectType()
export class ContractsConnection extends Connection(ContractNode) {}
