import { EntityBaseSchema } from '@appvise/typeorm';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ContractStandardType } from '@koiner/contracts/standards';
import { ContractSchema } from './contract.schema';

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

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => ContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  private _contract_id_fg!: never;

  @Index()
  @Column({ length: 70 })
  readonly transaction_id!: string;

  @Index()
  @Column({ type: 'bigint' })
  readonly entry_point!: number;

  @Column({ type: 'bytea', nullable: true })
  readonly args?: string;

  @Index()
  @Column()
  readonly name!: string;

  @Column({ type: 'jsonb', nullable: true })
  readonly data?: Record<string, any>;

  @Index()
  @Column({ type: 'enum', enum: ContractStandardType, nullable: true })
  readonly contract_standard_type?: ContractStandardType;

  @Index()
  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
