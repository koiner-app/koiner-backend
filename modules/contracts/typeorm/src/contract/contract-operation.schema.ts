import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ContractStandardType } from '@koiner/contracts/domain';

@Entity('contracts_contract_operation')
export class ContractOperationSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 35 })
  override readonly id!: string;

  @Column({ type: 'bigint' })
  readonly block_height!: number;

  @Column({ length: 35 })
  readonly contract_id!: string;

  @Column({ length: 70 })
  readonly transaction_id!: string;

  @Column({ type: 'bigint' })
  readonly entry_point!: number;

  @Column({ type: 'bytea' })
  readonly args!: string;

  @Column({ type: 'enum', enum: ContractStandardType, nullable: true })
  readonly contract_standard_type?: ContractStandardType;

  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
