import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';
import { AddressSchema } from '@koiner/chain/persistence/typeorm';
import { TokenContractSchema } from '../token';

@Entity('contracts_block_reward_balance')
export class BlockRewardBalanceSchema extends EntityBaseSchema {
  @Column({ length: 34 })
  readonly contract_id!: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => TokenContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  private _contract_id_fg!: never;

  @Column({ length: 34 })
  readonly address_id!: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => AddressSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  private _address_id_fg!: never;

  @Column({ length: 20 })
  readonly balance!: string;
}
