import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';

@Entity('tokenize_token_stats')
export class TokenStatsSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 46 })
  override readonly id!: string;

  @Column({ type: 'bigint' })
  readonly contract_count!: number;

  @Column({ type: 'bigint' })
  readonly operation_count!: number;

  @Column({ type: 'bigint' })
  readonly burn_count!: number;

  @Column({ type: 'bigint' })
  readonly mint_count!: number;

  @Column({ type: 'bigint' })
  readonly transfer_count!: number;
}
