import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { BlockProductionStats } from '@koiner/network/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('BlockProductionStats')
export class BlockProductionStatsNode extends BaseNode {
  @Field()
  contractId: string;

  @Field()
  rewarded: string;

  @Field(() => GraphQLBigInt)
  blocksProduced: number;

  @Field()
  burned: string;

  @Field(() => Float)
  roi: number;

  constructor(blockProductionStats: BlockProductionStats) {
    super(blockProductionStats);

    this.contractId = blockProductionStats.contractId.value;
    this.rewarded = blockProductionStats.rewarded.toString();
    this.blocksProduced = blockProductionStats.blocksProduced;
    this.burned = blockProductionStats.burned.toString();
    this.roi = blockProductionStats.roi;
  }
}
