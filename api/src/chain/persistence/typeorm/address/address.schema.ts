import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('address')
export class AddressSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 34 })
  readonly id: string;

  @Column({ type: 'smallint' })
  readonly contract_count: number;

  @Column({ type: 'smallint' })
  readonly operation_count: number;

  @Column({ type: 'smallint' })
  readonly transaction_count: number;
}
