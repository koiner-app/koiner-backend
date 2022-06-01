import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';
import { TokenContractSchema } from '.';

@Entity('contracts_token_balance')
export class TokenBalanceSchema extends EntityBaseSchema {
  @Column({ length: 34 })
  readonly contract_id!: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => TokenContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  private _contract_id_fg!: never;

  @Column({ length: 34 })
  readonly address_id!: string;

  @Column({ length: 20 })
  readonly balance!: string;
}