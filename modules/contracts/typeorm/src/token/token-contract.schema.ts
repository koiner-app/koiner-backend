import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';
import { ContractSchema } from '..';

@Entity('contracts_token_contract')
export class TokenContractSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 35 })
  override readonly id!: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => ContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  private _contract_id_fg!: never;

  @Column()
  readonly name!: string;

  @Column()
  readonly symbol!: string;

  @Column({ type: 'smallint' })
  readonly decimals!: number;

  @Column({ length: 20 })
  readonly total_supply!: string;

  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
