import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity } from 'typeorm';

@Entity('contracts_token_event')
export class TokenEventSchema extends EntityBaseSchema {
  @Column({ length: 35 })
  readonly contract_id!: string;

  @Column({ length: 8 })
  readonly name!: string;

  @Column({ length: 35, nullable: true })
  readonly from?: string;

  @Column({ length: 35, nullable: true })
  readonly to?: string;

  @Column({ length: 20 })
  readonly value!: string;

  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
