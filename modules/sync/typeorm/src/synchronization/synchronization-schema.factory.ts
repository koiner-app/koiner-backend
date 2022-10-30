import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { ChainId } from '@koiner/domain';
import { Synchronization, SynchronizationProps } from '@koiner/sync/domain';
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
      headTopologyHeight: entitySchema.head_topology_height,
      lastIrreversibleBlock: entitySchema.last_irreversible_block,
      lastSyncedBlock: entitySchema.last_synced_block,
      batchStartedAt: entitySchema.batch_started_at ?? undefined,
      batchStartHeight: entitySchema.batch_start_height ?? undefined,
      batchEndHeight: entitySchema.batch_end_height ?? undefined,
      syncing: entitySchema.syncing,
      stopped: entitySchema.stopped,
      stoppedAt: entitySchema.stopped_at ?? undefined,
      lastError: entitySchema.last_error
        ? JSON.stringify(entitySchema.last_error)
        : undefined,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: Synchronization
  ): EntitySchemaProps<SynchronizationSchema> {
    const props = entity.getPropsCopy();

    return {
      head_topology_height: props.headTopologyHeight,
      last_irreversible_block: props.lastIrreversibleBlock,
      last_synced_block: props.lastSyncedBlock,
      batch_started_at: props.batchStartedAt ?? null,
      batch_start_height: props.batchStartHeight ?? null,
      batch_end_height: props.batchEndHeight ?? null,
      syncing: props.syncing,
      stopped: props.stopped,
      stopped_at: props.stoppedAt ?? null,
      last_error: props.lastError ? JSON.parse(props.lastError) : null,
    };
  }
}
