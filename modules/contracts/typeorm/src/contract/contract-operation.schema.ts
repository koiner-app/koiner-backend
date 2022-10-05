import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { ContractStandardType } from '@koiner/contracts/standards';

@Entity('contracts_contract_operation')
export class ContractOperationSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 35 })
  override readonly id!: string;

  @Index()
  @Column({ type: 'bigint' })
  readonly block_height!: number;

  @Index()
  @Column({ length: 35 })
  readonly contract_id!: string;

  @Index()
  @Column({ length: 70 })
  readonly transaction_id!: string;

  @Index()
  @Column({ type: 'bigint' })
  readonly entry_point!: number;

  @Column({ type: 'bytea', nullable: true })
  readonly args?: string;

  @Index()
  @Column({ type: 'enum', enum: ContractStandardType, nullable: true })
  readonly contract_standard_type?: ContractStandardType;

  @Index()
  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
