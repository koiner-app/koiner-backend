import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';

@Entity('tokenize_token_contract')
export class TokenContractSchema extends EntityBaseSchema {
  @PrimaryColumn({ update: false })
  @Column({ length: 35 })
  override readonly id!: string;

  @Column()
  readonly name!: string;

  @Column()
  readonly symbol!: string;

  @Column({ type: 'smallint' })
  readonly decimals!: number;

  @Column({ length: 20 })
  readonly total_supply!: string;

  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
