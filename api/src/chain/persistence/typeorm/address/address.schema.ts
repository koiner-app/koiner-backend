import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('address')
export class AddressSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 34 })
  readonly id: string;

  @Column()
  readonly is_producer: boolean;

  @Column({ type: 'bigint' })
  readonly block_count: number;

  @Column({ type: 'bigint' })
  readonly operation_count: number;

  @Column({ type: 'bigint' })
  readonly transaction_count: number;
}
