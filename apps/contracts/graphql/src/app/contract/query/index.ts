import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import {
  ContractEventQuery,
  ContractQuery,
} from '@koiner/contracts/application';
import { ContractEventNode, ContractNode } from '../dto';

@Resolver(() => ContractNode)
export class ContractResolver extends NodeQuery(
  ContractNode,
  ContractQuery,
  'contract'
) {}

@Resolver(() => ContractEventNode)
export class ContractEventResolver extends NodeQuery(
  ContractEventNode,
  ContractEventQuery,
  'contractEvent'
) {}

export * from './contract-event-contract.resolver';
export * from './contracts.resolver';
export * from './contract-events.resolver';
export * from './contracts-bulk.resolver';
