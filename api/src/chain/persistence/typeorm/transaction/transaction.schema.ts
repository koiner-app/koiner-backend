import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('transaction')
@Index(['id', 'block_height'])
export class TransactionSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 70 })
  readonly id: string;

  @PrimaryColumn()
  @Column({ type: 'bigint' })
  readonly block_height: number;

  @Column({ length: 20 })
  readonly rc_limit: string;

  @Column({ length: 20, nullable: true })
  readonly nonce: string;

  @Column({ length: 48, nullable: true })
  readonly operation_merkle_root: string;

  @Column({ length: 34 })
  readonly signer: string;

  @Column({ length: 136 })
  readonly signature: string;

  @Column({ type: 'smallint' })
  readonly transaction_index: number;

  @Column({ type: 'smallint' })
  readonly operation_count: number;
}
