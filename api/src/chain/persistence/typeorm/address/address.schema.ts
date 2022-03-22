import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('address')
export class AddressSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 34 })
  readonly id: string;

  @Column({ type: 'bigint' })
  readonly contract_count: number;

  @Column({ type: 'bigint' })
  readonly operation_count: number;

  @Column({ type: 'bigint' })
  readonly transaction_count: number;
}
