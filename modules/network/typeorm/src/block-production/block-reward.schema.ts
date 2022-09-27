import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';

@Entity('network_block_reward')
export class BlockRewardSchema extends EntityBaseSchema {
  @Column({ length: 70 })
  readonly block_id!: string;

  @PrimaryColumn()
  @Column({ type: 'bigint' })
  readonly block_height!: number;

  @Column({ length: 35 })
  readonly producer_id!: string;

  @Column({ length: 20 })
  readonly value!: string;

  @Column({ length: 35, nullable: true })
  readonly burner_id?: string;

  @Column({ length: 20, nullable: true })
  readonly burned_value?: string;

  @Column({ length: 8, nullable: true })
  readonly roi?: string;

  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
