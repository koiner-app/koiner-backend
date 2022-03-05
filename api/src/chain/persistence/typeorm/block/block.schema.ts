import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity('block')
@Unique(['id', 'previous'])
export class BlockSchema extends EntityBaseSchema {
  @Column({ length: 70 })
  readonly id: string;

  @Column({ length: 70 })
  readonly previous: string;

  @PrimaryColumn()
  @Column({ type: 'bigint', unique: true })
  readonly height: number;

  @Column({ type: 'bigint' })
  readonly timestamp: number;

  @Column({ length: 48, nullable: true })
  readonly previous_state_merkle_root: string;

  @Column({ length: 48, nullable: true })
  readonly transaction_merkle_root: string;

  @Column({ length: 38, nullable: true })
  readonly signer: string;

  @Column({ length: 136 })
  readonly signature: string;

  @Column({ type: 'smallint' })
  readonly transaction_count: number;
}
