import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Synchronization } from '@koiner/sync/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('Synchronization')
export class SynchronizationNode extends BaseNode {
  @Field(() => GraphQLBigInt, { nullable: true })
  headTopologyHeight: number;

  @Field(() => GraphQLBigInt, { nullable: true })
  lastIrreversibleBlock: number;

  @Field(() => GraphQLBigInt, { nullable: true })
  batchStartedAt?: number;

  @Field(() => GraphQLBigInt, { nullable: true })
  batchStartHeight?: number;

  @Field(() => GraphQLBigInt, { nullable: true })
  batchEndHeight?: number;

  @Field(() => GraphQLBigInt)
  lastSyncedBlock: number;

  @Field({ nullable: true })
  lastError?: string;

  @Field()
  syncing: boolean;

  @Field()
  stopped: boolean;

  @Field(() => GraphQLBigInt, { nullable: true })
  stoppedAt?: number;

  constructor(entity: Synchronization) {
    super(entity);

    this.headTopologyHeight = entity.headTopologyHeight;
    this.lastIrreversibleBlock = entity.lastIrreversibleBlock;
    this.batchStartedAt = entity.batchStartedAt;
    this.batchStartHeight = entity.batchStartHeight;
    this.batchEndHeight = entity.batchEndHeight;
    this.lastSyncedBlock = entity.lastSyncedBlock;
    this.lastError = entity.lastError?.toString();
    this.syncing = entity.syncing;
    this.stopped = entity.stopped;
    this.stoppedAt = entity.stoppedAt;
  }
}
