import { Column, Entity, Index } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';

@Entity('network_block_production_stats')
export class BlockProductionStatsSchema extends EntityBaseSchema {
  @Index()
  @Column({ length: 35 })
  readonly contract_id!: string;

  @Index()
  @Column({ length: 20 })
  readonly blocks_produced!: string;

  @Index()
  @Column({ length: 20 })
  readonly rewarded!: string;

  @Index()
  @Column({ length: 20 })
  readonly minted_total!: string;

  @Index()
  @Column({ length: 20 })
  readonly burned_total!: string;

  @Index()
  @Column({ length: 20 })
  readonly producer_count!: string;

  @Column({ length: 8 })
  readonly roi!: string;
}
