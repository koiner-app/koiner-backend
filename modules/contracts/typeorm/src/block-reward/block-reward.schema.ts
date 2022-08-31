import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';
import { AddressSchema } from '../address';
import { TokenContractSchema } from '../token';

@Entity('contracts_block_reward')
export class BlockRewardSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ type: 'bigint' })
  readonly block_height!: number;

  @Column({ length: 35 })
  readonly producer_id!: string;

  @Column({ length: 35 })
  readonly contract_id!: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => TokenContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  private _contract_id_fg!: never;

  @Column({ length: 20 })
  readonly value!: string;

  @Column({ length: 35, nullable: true })
  readonly burned_contract_id?: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => TokenContractSchema, { nullable: true, persistence: false })
  @JoinColumn({ name: 'burned_contract_id', referencedColumnName: 'id' })
  private _burned_contract_id_fg?: never;

  @Column({ length: 35, nullable: true })
  readonly burner_id?: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => AddressSchema, { nullable: true, persistence: false })
  @JoinColumn({ name: 'burner_id', referencedColumnName: 'id' })
  private _burner_id_fg?: never;

  @Column({ length: 20, nullable: true })
  readonly burned_value?: string;

  @Column({ length: 8, nullable: true })
  readonly roi?: string;

  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
