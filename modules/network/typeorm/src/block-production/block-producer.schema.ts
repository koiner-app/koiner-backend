import { Column, Entity } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';

@Entity('network_block_producer')
export class BlockProducerSchema extends EntityBaseSchema {
  @Column({ length: 35 })
  readonly contract_id!: string;

  @Column({ length: 35 })
  readonly address_id!: string;

  @Column({ length: 20 })
  readonly balance!: string;

  @Column({ length: 20 })
  readonly blocks_produced!: string;
}
