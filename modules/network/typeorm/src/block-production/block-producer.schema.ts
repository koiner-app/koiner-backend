import { Column, Entity, Index } from 'typeorm';
import { EntityBaseStampedSchema } from '@appvise/typeorm';

@Entity('network_block_producer')
export class BlockProducerSchema extends EntityBaseStampedSchema {
  @Index()
  @Column({ length: 35 })
  readonly contract_id!: string;

  @Index()
  @Column({ length: 35 })
  readonly address_id!: string;

  @Index()
  @Column({ length: 20 })
  readonly balance!: string;

  @Index()
  @Column({ length: 20 })
  readonly blocks_produced!: string;

  @Index()
  @Column({ length: 20 })
  readonly minted_total!: string;

  @Index()
  @Column({ length: 20 })
  readonly burned_total!: string;

  @Column({ length: 8 })
  readonly roi!: string;
}
