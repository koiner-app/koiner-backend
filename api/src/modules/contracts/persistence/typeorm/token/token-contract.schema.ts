import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import {
  BlockSchema,
  TransactionSchema,
} from '@koiner/chain/persistence/typeorm';
import { ContractSchema } from '@koiner/contracts/persistence/typeorm';

@Entity('contracts_token_contract')
export class TokenContractSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 34 })
  readonly id: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => ContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  private _contract_id_fg: never;

  @Column({ type: 'bigint' })
  readonly block_height: number;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => BlockSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'block_height', referencedColumnName: 'height' })
  private readonly _block_height_fg: never;

  @Column({ length: 70 })
  readonly transaction_id: string;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => TransactionSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  private readonly _transaction_id_fg: never;

  @Column({ type: 'smallint' })
  readonly operation_index: number;

  @Column()
  readonly name: string;

  @Column()
  readonly symbol: string;

  @Column({ type: 'smallint' })
  readonly decimals: number;

  @Column({ length: 20 })
  readonly total_supply: string;

  @Column({ type: 'bigint' })
  readonly holder_count: number;

  @Column({ type: 'bigint' })
  readonly operation_count: number;

  @Column({ type: 'bigint' })
  readonly mint_count: number;

  @Column({ type: 'bigint' })
  readonly transfer_count: number;
}
