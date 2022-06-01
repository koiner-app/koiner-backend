import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { BlockTopology, KoinosId } from '@koiner/domain';
import { Chain, ChainId, ChainProps } from '@koiner/chain/domain';
import { ChainSchema } from '.';

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
    };
  }
}