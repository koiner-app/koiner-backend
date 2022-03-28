import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { Krc20ContractNode } from '../dto/krc20-contract.node';
import { Krc20OperationNode } from '../dto/krc20-operation.node';
import {
  Krc20ContractQuery,
  Krc20OperationQuery,
} from '@koiner/contracts/application/krc20/query';

@Resolver(() => Krc20ContractNode)
export class Krc20ContractResolver extends NodeQuery(
  Krc20ContractNode,
  Krc20ContractQuery,
  'krc20Contract',
) {}

@Resolver(() => Krc20OperationNode)
export class Krc20OperationResolver extends NodeQuery(
  Krc20OperationNode,
  Krc20OperationQuery,
  'krc20Operation',
) {}
