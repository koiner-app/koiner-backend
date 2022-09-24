import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';
import { TokenContractSchema } from '.';

@Entity('tokenize_token_holder')
export class TokenHolderSchema extends EntityBaseSchema {
  @PrimaryColumn({ update: false })
  @Column({ length: 35 })
  override readonly id!: string;

  @PrimaryColumn()
  @Column({ length: 35 })
  readonly contract_id!: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => TokenContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  private _contract_id_fg!: never;

  @Column({ length: 20 })
  readonly balance!: string;
}
