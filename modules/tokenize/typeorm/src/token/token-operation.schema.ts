import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';
import { TokenContractSchema } from './token-contract.schema';

@Entity('tokenize_token_operation')
export class TokenOperationSchema extends EntityBaseSchema {
  @Index()
  @Column({ length: 35 })
  readonly contract_id!: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => TokenContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  private _contract_id_fg!: never;

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
