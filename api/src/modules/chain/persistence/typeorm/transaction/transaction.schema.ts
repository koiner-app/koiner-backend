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
import { AddressSchema, BlockSchema, OperationSchema } from '..';

@Entity('chain_transaction')
@Index(['id', 'block_height'])
export class TransactionSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 70 })
  readonly id!: string;

  @PrimaryColumn()
  @Column({ type: 'bigint' })
  readonly block_height!: number;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => BlockSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'block_height', referencedColumnName: 'height' })
  private readonly _block_height_fg!: never;

  @Column({ length: 20 })
  readonly rc_limit!: string;

  @Column({ length: 20, nullable: true })
  readonly nonce?: string;

  @Column({ length: 48, nullable: true })
  readonly operation_merkle_root?: string;

  @Column({ length: 34 })
  readonly payer!: string;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => AddressSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'payer', referencedColumnName: 'id' })
  private readonly _payer_fg!: never;

  // TODO: What should be max length of signature?
  @Column({ length: 255 })
  readonly signature!: string;

  @Column({ type: 'smallint' })
  readonly transaction_index!: number;

  @OneToMany(() => OperationSchema, (operation) => operation.transaction, {
    cascade: ['insert'],
  })
  readonly operations!: OperationSchema[];

  @Column({ type: 'smallint' })
  readonly operation_count!: number;
}
