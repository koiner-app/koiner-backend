import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AddressSchema } from '@koiner/chain/persistence/typeorm';
import { ContractStandardType } from '@koiner/contracts/domain';

@Entity('contracts_contract')
export class ContractSchema extends EntityBaseSchema {
  @Column({ length: 34 })
  readonly id!: string;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => AddressSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  private readonly _address_id_fg!: never;

  @Column({ type: 'bytea' })
  readonly bytecode!: string;

  @Column({ type: 'text', nullable: true })
  readonly abi?: string;

  @Column({ type: 'enum', enum: ContractStandardType, nullable: true })
  readonly contract_standard_type?: ContractStandardType;
}
