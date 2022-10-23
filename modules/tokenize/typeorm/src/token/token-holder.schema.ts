import { Column, Entity, Index } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';

@Entity('tokenize_token_holder')
export class TokenHolderSchema extends EntityBaseSchema {
  @Index()
  @Column({ length: 35 })
  readonly address_id!: string;

  @Index()
  @Column({ length: 35 })
  readonly contract_id!: string;

  @Index()
  @Column({ length: 20 })
  readonly balance!: string;

  @Column({ type: 'bigint' })
  readonly burn_count!: number;

  @Column({ type: 'bigint' })
  readonly mint_count!: number;

  @Column({ type: 'bigint' })
  readonly transfer_in_count!: number;

  @Column({ type: 'bigint' })
  readonly transfer_out_count!: number;
}
