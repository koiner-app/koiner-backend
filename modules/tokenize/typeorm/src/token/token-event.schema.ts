import { Column, Entity, Index } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';

@Entity('tokenize_token_event')
export class TokenEventSchema extends EntityBaseSchema {
  @Column({ length: 35 })
  readonly contract_id!: string;

  @Index()
  @Column({ length: 8 })
  readonly name!: string;

  @Index()
  @Column({ length: 35, nullable: true })
  readonly from?: string;

  @Index()
  @Column({ length: 35, nullable: true })
  readonly to?: string;

  @Index()
  @Column({ length: 20 })
  readonly value!: string;

  @Index()
  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
