import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ContractStandardType } from '@koiner/contracts/standards';
import { EventParentType } from '@koiner/domain';
import { ContractSchema } from './contract.schema';

@Entity('contracts_contract_event')
@Index(['parent_id', 'parent_type'])
export class ContractEventSchema extends EntityBaseSchema {
  @Index()
  @Column({ type: 'bigint' })
  readonly block_height!: number;

  @Column({ length: 70 })
  readonly parent_id!: string;

  @Column({ type: 'enum', enum: EventParentType })
  readonly parent_type!: EventParentType;

  @Column({ type: 'smallint', nullable: true })
  readonly sequence?: number;

  @Column({ length: 35 })
  readonly contract_id!: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => ContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  private _contract_id_fg!: never;

  @Index()
  @Column({ type: 'enum', enum: ContractStandardType, nullable: true })
  readonly contract_standard_type?: ContractStandardType;

  @Index()
  @Column()
  readonly name!: string;

  @Column({ type: 'bytea', nullable: true })
  readonly data?: string;

  @Index()
  @Column({ type: 'simple-array', nullable: true })
  readonly impacted?: string[];

  @Index()
  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
