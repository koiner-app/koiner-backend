import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('chain_address')
export class AddressSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 34 })
  readonly id: string;

  @Column()
  readonly is_producer: boolean;
}
