import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { BlockTopology, KoinosId } from '@koiner/domain';
import {
  Synchronization,
  ChainId,
  SynchronizationProps,
} from '@koiner/sync/domain';
import { SynchronizationSchema } from '.';

export class SynchronizationSchemaFactory extends EntitySchemaFactory<
  Synchronization,
  SynchronizationSchema
> {
  protected toDomainProps(
    entitySchema: SynchronizationSchema
  ): EntityProps<SynchronizationProps> {
    const id = new ChainId(entitySchema.id);

    const props: SynchronizationProps = {
      headTopology: new BlockTopology({
        id: new KoinosId(entitySchema.head_topology_id),
        previous: entitySchema.head_topology_previous,
        height: entitySchema.head_topology_height,
      }),
      lastIrreversibleBlock: entitySchema.last_irreversible_block,
      syncing: entitySchema.syncing,
      stopped: entitySchema.stopped,
      lastSyncedBlock: entitySchema.last_synced_block,
      lastSyncStarted: entitySchema.last_sync_started,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: Synchronization
  ): EntitySchemaProps<SynchronizationSchema> {
    const props = entity.getPropsCopy();

    return {
      head_topology_id: props.headTopology.id.value,
      head_topology_previous: props.headTopology.previous,
      head_topology_height: props.headTopology.height,
      last_irreversible_block: props.lastIrreversibleBlock,
      syncing: props.syncing,
      stopped: props.stopped,
      last_synced_block: props.lastSyncedBlock,
      last_sync_started: props.lastSyncStarted,
    };
  }
}
