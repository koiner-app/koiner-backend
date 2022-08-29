import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { ContractEventNode } from '.';

@ObjectType()
export class ContractEventsConnection extends Connection(ContractEventNode) {}
