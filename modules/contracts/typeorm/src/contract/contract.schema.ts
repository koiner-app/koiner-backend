import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity } from 'typeorm';
import { ContractStandardType } from '@koiner/contracts/domain';

@Entity('contracts_contract')
export class ContractSchema extends EntityBaseSchema {
  @Column({ length: 35 })
  override readonly id!: string;

  @Column({ type: 'bytea' })
  readonly bytecode!: string;

  @Column({ type: 'text', nullable: true })
  readonly abi?: string;

  @Column({ type: 'enum', enum: ContractStandardType, nullable: true })
  readonly contract_standard_type?: ContractStandardType;

  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
