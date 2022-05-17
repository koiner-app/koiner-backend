import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OperationType } from '@koiner/chain/domain/operation/operation.types';
import { TransactionSchema } from '..';

@Entity('chain_operation')
export class OperationSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ type: 'bigint' })
  readonly block_height!: number;

  @Column({ length: 70 })
  readonly transaction_id!: string;

  @ManyToOne(() => TransactionSchema)
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  readonly transaction!: TransactionSchema;

  @Column({ type: 'smallint' })
  readonly operation_index!: number;

  @Column({ type: 'enum', enum: OperationType })
  readonly type!: OperationType;
}
