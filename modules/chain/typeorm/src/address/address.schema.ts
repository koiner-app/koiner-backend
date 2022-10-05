import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('chain_address')
export class AddressSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 35 })
  override readonly id!: string;

  @Index()
  @Column()
  readonly is_producer!: boolean;

  @Index()
  @Column()
  readonly is_contract!: boolean;

  @Index()
  @Column()
  readonly is_token_contract!: boolean;

  @Index()
  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
