import { EntityBaseSchema } from '@appvise/typeorm';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { AddressSchema, BlockSchema } from '@koiner/chain/persistence/typeorm';

@Entity('transaction')
@Index(['id', 'block_height'])
export class TransactionSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 70 })
  readonly id: string;

  @PrimaryColumn()
  @Column({ type: 'bigint' })
  readonly block_height: number;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => BlockSchema, { nullable: false })
  @JoinColumn({ name: 'block_height', referencedColumnName: 'height' })
  private readonly _block_height_fg: BlockSchema;

  @Column({ length: 20 })
  readonly rc_limit: string;

  @Column({ length: 20, nullable: true })
  readonly nonce: string;

  @Column({ length: 48, nullable: true })
  readonly operation_merkle_root: string;

  @Column({ length: 34 })
  readonly signer: string;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => AddressSchema, { nullable: false })
  @JoinColumn({ name: 'signer', referencedColumnName: 'id' })
  private readonly _signer_fg: AddressSchema;

  @Column({ length: 136 })
  readonly signature: string;

  @Column({ type: 'smallint' })
  readonly transaction_index: number;

  @Column({ type: 'smallint' })
  readonly operation_count: number;
}
