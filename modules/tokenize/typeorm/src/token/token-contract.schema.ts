import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';

@Entity('tokenize_token_contract')
export class TokenContractSchema extends EntityBaseSchema {
  @PrimaryColumn({ update: false })
  @Column({ length: 35 })
  override readonly id!: string;

  @Index()
  @Column()
  readonly name!: string;

  @Index()
  @Column()
  readonly symbol!: string;

  @Column({ type: 'smallint' })
  readonly decimals!: number;

  @Index()
  @Column({ length: 20 })
  readonly total_supply!: string;

  @Column({ type: 'bigint' })
  readonly burn_count!: number;

  @Column({ type: 'bigint' })
  readonly mint_count!: number;

  @Column({ type: 'bigint' })
  readonly transfer_count!: number;

  @Index()
  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
