import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';

@Entity('tokenize_koin_stats')
export class KoinStatsSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 46 })
  override readonly id!: string;

  @Column({ type: 'decimal', precision: 10, scale: 4, default: 0 })
  readonly price!: number;

  @Column({ type: 'decimal', precision: 10, scale: 4, default: 0 })
  readonly bid_price!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  readonly bid_quantity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 4, default: 0 })
  readonly ask_price!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  readonly ask_quantity!: number;

  @Index()
  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
