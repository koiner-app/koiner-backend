import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { Krc20ContractNode } from './krc20-contract.node';

@ObjectType()
export class Krc20ContractsConnection extends Connection(Krc20ContractNode) {}
