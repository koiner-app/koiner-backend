import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TransactionSchema } from '@koiner/chain/persistence/typeorm';
import { ContractStandardType } from '@koiner/contracts/domain';
import { ContractSchema } from '@koiner/contracts/persistence/typeorm';

@Entity('chain_event')
export class EventSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 70 })
  readonly transaction_id: string;

  @ManyToOne(() => TransactionSchema)
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  readonly transaction: TransactionSchema;

  @PrimaryColumn()
  @Column({ type: 'smallint' })
  readonly sequence: number;

  @Column({ length: 34 })
  readonly contract_id: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => ContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  private _contract_id_fg: never;

  @Column({ type: 'enum', enum: ContractStandardType, nullable: true })
  readonly contract_standard_type: ContractStandardType;

  @Column()
  readonly name: string;

  @Column({ type: 'bytea' })
  readonly data: string;

  @Column({ type: 'simple-array' })
  readonly impacted: string[];
}
