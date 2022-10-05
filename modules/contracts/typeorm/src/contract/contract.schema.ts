import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { ContractStandardType } from '@koiner/contracts/standards';

@Entity('contracts_contract')
export class ContractSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 35 })
  override readonly id!: string;

  @Column({ type: 'bytea' })
  readonly bytecode!: string;

  @Column({ type: 'text', nullable: true })
  readonly abi?: string;

  @Column({ type: 'enum', enum: ContractStandardType, nullable: true })
  readonly contract_standard_type?: ContractStandardType;

  @Index()
  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
