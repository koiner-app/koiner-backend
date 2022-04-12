import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AddressSchema, BlockSchema } from '@koiner/chain/persistence/typeorm';
import { Krc20ContractSchema } from '@koiner/contracts/persistence/typeorm';

@Entity('block_reward')
export class BlockRewardSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ type: 'bigint' })
  readonly block_height: number;

  // Add foreign key without the need to persist the object
  @ManyToOne(() => BlockSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'block_height', referencedColumnName: 'height' })
  private readonly _block_height_fg: never;

  @Column({ length: 34 })
  readonly contract_id: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => Krc20ContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  private _contract_id_fg: never;

  @Column({ length: 34 })
  readonly producer_id: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => AddressSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'producer_id', referencedColumnName: 'id' })
  private _producer_id_fg: never;

  @Column({ length: 20 })
  readonly value: string;
}
