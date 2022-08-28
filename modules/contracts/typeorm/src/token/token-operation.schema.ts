import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';
import { TokenContractSchema } from '.';

@Entity('contracts_token_operation')
export class TokenOperationSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 34 })
  override readonly id!: string;

  @Column({ length: 34 })
  readonly contract_id!: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => TokenContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  private _contract_id_fg!: never;

  @Column({ length: 70 })
  readonly transaction_id!: string;

  @Column({ length: 8 })
  readonly name!: string;

  @Column({ length: 34, nullable: true })
  readonly from?: string;

  @Column({ length: 34, nullable: true })
  readonly to?: string;

  @Column({ length: 20 })
  readonly value!: string;
}
