import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity('chain_block')
@Unique(['id', 'previous'])
export class BlockSchema extends EntityBaseSchema {
  @Column({ length: 70 })
  override readonly id!: string;

  @Column({ length: 70 })
  readonly previous!: string;

  @PrimaryColumn()
  @Column({ type: 'bigint', unique: true })
  readonly height!: number;

  @Column({ type: 'bigint' })
  readonly timestamp!: number;

  @Column({ length: 48, nullable: true })
  readonly previous_state_merkle_root?: string;

  @Column({ length: 48, nullable: true })
  readonly transaction_merkle_root?: string;

  @Column({ length: 38 })
  readonly signer!: string;

  @Column()
  readonly signature!: string;

  @Column({ type: 'smallint' })
  readonly transaction_count!: number;

  /** Receipt */

  @Column({ type: 'bigint' })
  readonly disk_storage_used!: number;

  @Column({ type: 'bigint' })
  readonly network_bandwidth_used!: number;

  @Column({ type: 'bigint' })
  readonly compute_bandwidth_used!: number;

  @Column({ type: 'smallint' })
  readonly event_count!: number;
}
