import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, Index, PrimaryColumn, Unique } from 'typeorm';

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

  @Index()
  @Column({ type: 'bigint' })
  readonly timestamp!: number;

  @Column({ length: 48, nullable: true })
  readonly previous_state_merkle_root?: string;

  @Column({ length: 48, nullable: true })
  readonly transaction_merkle_root?: string;

  @Index()
  @Column({ length: 38 })
  readonly signer!: string;

  @Column()
  readonly signature!: string;

  @Index()
  @Column({ type: 'smallint' })
  readonly transaction_count!: number;

  /** Receipt */
  @Column({ length: 20 })
  readonly disk_storage_used!: string;

  @Column({ length: 20 })
  readonly network_bandwidth_used!: string;

  @Column({ length: 20 })
  readonly compute_bandwidth_used!: string;

  @Column({ type: 'smallint' })
  readonly event_count!: number;
}
