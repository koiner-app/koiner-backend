import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Chain } from '@koiner/chain/domain';
import { GraphQLBigInt } from 'graphql-scalars';
import { ChainStatsField } from './chain-stats.field';

@ObjectType('Chain')
export class ChainNode extends BaseNode {
  @Field(() => ChainStatsField)
  stats: ChainStatsField;

  @Field(() => GraphQLBigInt)
  timestamp: number;

  constructor(chain: Chain) {
    super(chain);

    this.stats = new ChainStatsField(chain.stats);
    this.timestamp = chain.timestamp;
  }
}
