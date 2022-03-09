import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import {
  BlockSchema,
  ContractSchema,
  TransactionSchema,
} from '@koiner/chain/persistence/typeorm';

@Entity('krc20_contract')
export class Krc20ContractSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 34 })
  readonly id: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => ContractSchema, { nullable: false })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  private _contract_id_fg: ContractSchema;

  @Column({ type: 'bigint' })
  readonly block_height: number;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => BlockSchema, { nullable: false })
  @JoinColumn({ name: 'block_height', referencedColumnName: 'height' })
  private readonly _block_height_fg: BlockSchema;

  @Column({ length: 70 })
  readonly transaction_id: string;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => TransactionSchema, { nullable: false })
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  private readonly _transaction_id_fg: TransactionSchema;

  @Column({ type: 'smallint' })
  readonly operation_index: number;

  @Column()
  readonly name: string;

  @Column()
  readonly symbol: string;

  @Column({ type: 'smallint' })
  readonly decimals: number;
}