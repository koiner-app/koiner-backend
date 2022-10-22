import { EntityBaseSchema } from '@appvise/typeorm';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BlockSchema, OperationSchema } from '..';

@Entity('chain_transaction')
@Index(['id', 'block_height'])
export class TransactionSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 70 })
  override readonly id!: string;

  @PrimaryColumn()
  @Column({ type: 'bigint' })
  readonly block_height!: number;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => BlockSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'block_height', referencedColumnName: 'height' })
  private readonly _block_height_fg!: never;

  @OneToMany(() => OperationSchema, (operation) => operation.transaction, {
    cascade: ['insert'],
  })
  readonly operations!: OperationSchema[];

  @Column({ type: 'smallint' })
  readonly operation_count!: number;

  @Column({ type: 'simple-array' })
  readonly signatures!: string[];

  @Column({ type: 'smallint' })
  readonly transaction_index!: number;

  @Index()
  @Column({ type: 'bigint' })
  readonly timestamp!: number;

  /**
   *  Header
   */
  @Column({ length: 20 })
  readonly rc_limit!: string;

  @Column({ length: 20, nullable: true })
  readonly nonce?: string;

  @Column({ length: 48, nullable: true })
  readonly operation_merkle_root?: string;

  @Index()
  @Column({ length: 35 })
  readonly payer!: string;

  @Index()
  @Column({ length: 35, nullable: true })
  readonly payee?: string;

  /**
   *  Receipt
   */
  @Column({ length: 20 })
  readonly max_payer_rc!: string;

  @Index()
  @Column({ length: 20 })
  readonly rc_used!: string;

  @Index()
  @Column({ length: 20 })
  readonly disk_storage_used!: string;

  @Index()
  @Column({ length: 20 })
  readonly network_bandwidth_used!: string;

  @Index()
  @Column({ length: 20 })
  readonly compute_bandwidth_used!: string;

  @Column({ type: 'smallint' })
  readonly event_count!: number;

  @Column()
  readonly reverted!: boolean;
}
