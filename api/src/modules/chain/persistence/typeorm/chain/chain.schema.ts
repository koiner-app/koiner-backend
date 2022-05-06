import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('chain_chain')
export class ChainSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 46 })
  readonly id: string;

  @Column({ length: 70 })
  readonly head_topology_id: string;

  @Column({ length: 70 })
  readonly head_topology_previous: string;

  @Column({ type: 'bigint' })
  readonly head_topology_height: number;

  @Column({ type: 'bigint' })
  readonly last_irreversible_block: number;

  @Column()
  readonly syncing: boolean;

  @Column()
  readonly stopped: boolean;

  @Column({ type: 'bigint' })
  readonly last_synced_block: number;
}