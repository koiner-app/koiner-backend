import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';

@Entity('chain_chain')
export class ChainSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 46 })
  override readonly id!: string;

  @Column({ type: 'bigint' })
  readonly address_count!: number;

  @Column({ type: 'bigint' })
  readonly operation_count!: number;

  @Column({ type: 'bigint' })
  readonly transaction_count!: number;

  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
