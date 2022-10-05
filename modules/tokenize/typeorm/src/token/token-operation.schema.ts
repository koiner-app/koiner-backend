import { Column, Entity, Index } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';

@Entity('tokenize_token_operation')
export class TokenOperationSchema extends EntityBaseSchema {
  @Index()
  @Column({ length: 35 })
  readonly contract_id!: string;

  @Index()
  @Column({ length: 70 })
  readonly transaction_id!: string;

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
