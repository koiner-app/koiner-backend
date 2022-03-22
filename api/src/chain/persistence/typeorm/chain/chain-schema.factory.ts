import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import {
  Chain,
  ChainId,
  ChainProps,
  ChainStatistics,
} from '@koiner/chain/domain';
import { ChainSchema } from './chain.schema';
import { BlockTopology, KoinosId } from '@koiner/domain';

export class ChainSchemaFactory extends EntitySchemaFactory<
  Chain,
  ChainSchema
> {
  protected toDomainProps(entitySchema: ChainSchema): EntityProps<ChainProps> {
    const id = new ChainId(entitySchema.id);

    const props: ChainProps = {
      headTopology: new BlockTopology({
        id: new KoinosId(entitySchema.head_topology_id),
        previous: entitySchema.head_topology_previous,
        height: entitySchema.head_topology_height,
      }),
      lastIrreversibleBlock: entitySchema.last_irreversible_block,
      syncing: entitySchema.syncing,
      stopped: entitySchema.stopped,
      lastSyncedBlock: entitySchema.last_synced_block,
      stats: new ChainStatistics({
        addressCount: entitySchema.address_count,
        contractCount: entitySchema.contract_count,
        operationCount: entitySchema.operation_count,
        transactionCount: entitySchema.transaction_count,
      }),
    };

    return { id, props };
  }

  protected toSchemaProps(entity: Chain): EntitySchemaProps<ChainSchema> {
    const props = entity.getPropsCopy();

    return {
      head_topology_id: props.headTopology.id.value,
      head_topology_previous: props.headTopology.previous,
      head_topology_height: props.headTopology.height,
      last_irreversible_block: props.lastIrreversibleBlock,
      syncing: props.syncing,
      stopped: props.stopped,
      last_synced_block: props.lastSyncedBlock,
      address_count: props.stats.addressCount,
      contract_count: props.stats.contractCount,
      operation_count: props.stats.operationCount,
      transaction_count: props.stats.transactionCount,
    };
  }
}
