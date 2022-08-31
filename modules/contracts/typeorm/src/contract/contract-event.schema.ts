import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity } from 'typeorm';
import {
  ContractEventParentType,
  ContractStandardType,
} from '@koiner/contracts/domain';

@Entity('contracts_contract_event')
export class ContractEventSchema extends EntityBaseSchema {
  @Column({ length: 70 })
  readonly parent_id!: string;

  @Column({ type: 'enum', enum: ContractEventParentType })
  readonly parent_type!: ContractEventParentType;

  @Column({ type: 'smallint', nullable: true })
  readonly sequence?: number;

  @Column({ length: 35 })
  readonly contract_id!: string;

  @Column({ type: 'enum', enum: ContractStandardType, nullable: true })
  readonly contract_standard_type?: ContractStandardType;

  @Column()
  readonly name!: string;

  @Column({ type: 'bytea' })
  readonly data!: string;

  @Column({ type: 'simple-array', nullable: true })
  readonly impacted?: string[];

  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
