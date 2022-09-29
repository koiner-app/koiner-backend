import { Column, Entity } from 'typeorm';
import { EntityBaseSchema } from '@appvise/typeorm';

@Entity('tokenize_token_holder')
export class TokenHolderSchema extends EntityBaseSchema {
  @Column({ length: 35 })
  readonly address_id!: string;

  @Column({ length: 35 })
  readonly contract_id!: string;

  @Column({ length: 20 })
  readonly balance!: string;
}
