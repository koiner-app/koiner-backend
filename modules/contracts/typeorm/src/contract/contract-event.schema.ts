import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, Index } from 'typeorm';
import { ContractStandardType } from '@koiner/contracts/standards';
import { ContractEventParentType } from '@koiner/contracts/domain';

@Entity('contracts_contract_event')
@Index(['parent_id', 'parent_type'])
export class ContractEventSchema extends EntityBaseSchema {
  @Index()
  @Column({ type: 'bigint' })
  readonly block_height!: number;

  @Column({ length: 70 })
  readonly parent_id!: string;

  @Column({ type: 'enum', enum: ContractEventParentType })
  readonly parent_type!: ContractEventParentType;

  @Column({ type: 'smallint', nullable: true })
  readonly sequence?: number;

  @Index()
  @Column({ length: 35 })
  readonly contract_id!: string;

  @Index()
  @Column({ type: 'enum', enum: ContractStandardType, nullable: true })
  readonly contract_standard_type?: ContractStandardType;

  @Index()
  @Column()
  readonly name!: string;

  @Column({ type: 'bytea' })
  readonly data!: string;

  @Index()
  @Column({ type: 'simple-array', nullable: true })
  readonly impacted?: string[];

  @Index()
  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
