import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import {
  AddressSchema,
  BlockSchema,
  TransactionSchema,
} from '@koiner/chain/persistence/typeorm';
import { ContractStandardType } from '@koiner/contracts/domain';

@Entity('contracts_contract')
export class ContractSchema extends EntityBaseSchema {
  @Column({ length: 34 })
  readonly id: string;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => AddressSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  private readonly _address_id_fg: never;

  @PrimaryColumn()
  @Column({ type: 'bigint' })
  readonly block_height: number;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => BlockSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'block_height', referencedColumnName: 'height' })
  private readonly _block_height_fg: never;

  @PrimaryColumn()
  @Column({ length: 70 })
  readonly transaction_id: string;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => TransactionSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  private readonly _transaction_id_fg: never;

  @Column({ type: 'bytea' })
  readonly bytecode: string;

  @Column({ type: 'text', nullable: true })
  readonly abi: string;

  @Column({ type: 'enum', enum: ContractStandardType, nullable: true })
  readonly contract_standard_type: ContractStandardType;

  @PrimaryColumn()
  @Column({ type: 'smallint' })
  readonly operation_index: number;
}
