import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';
import { AddressSchema } from '..';

@Entity('contracts_block_producer')
export class BlockProducerSchema extends EntityBaseSchema {
  @Column({ length: 35 })
  readonly contract_id!: string;

  @Column({ length: 35 })
  readonly address_id!: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => AddressSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  private _address_id_fg!: never;

  @Column({ length: 20 })
  readonly balance!: string;

  @Column({ length: 20 })
  readonly blocks_produced!: string;
}
