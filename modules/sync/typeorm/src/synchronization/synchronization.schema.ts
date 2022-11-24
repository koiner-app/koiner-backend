import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sync_synchronization')
export class SynchronizationSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 46 })
  override readonly id!: string;

  @Column({ type: 'bigint' })
  readonly head_topology_height!: number;

  @Column({ type: 'bigint' })
  readonly last_irreversible_block!: number;

  @Column({ type: 'bigint' })
  readonly last_synced_block!: number;

  @Column({ type: 'bigint', nullable: true })
  readonly batch_started_at?: number | null;

  @Column({ type: 'bigint', nullable: true })
  readonly batch_start_height?: number | null;

  @Column({ type: 'bigint', nullable: true })
  readonly batch_end_height?: number | null;

  @Column()
  readonly syncing!: boolean;

  @Column()
  readonly stopped!: boolean;

  @Column({ type: 'bigint', nullable: true })
  readonly stopped_at?: number | null;

  @Column({ type: 'jsonb', nullable: true })
  readonly last_error?: Record<string, any> | null;
}
