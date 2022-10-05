import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, Index } from 'typeorm';
import { EventParentType } from '@koiner/chain/domain';

@Entity('chain_event')
@Index(['parent_id', 'parent_type'])
export class EventSchema extends EntityBaseSchema {
  @Index()
  @Column({ type: 'bigint' })
  readonly block_height!: number;

  @Column({ length: 70 })
  readonly parent_id!: string;

  @Column({ type: 'enum', enum: EventParentType })
  readonly parent_type!: EventParentType;

  @Column({ type: 'smallint', nullable: true })
  readonly sequence?: number;

  @Index()
  @Column({ length: 35, nullable: true })
  readonly contract_id?: string;

  @Index()
  @Column()
  readonly name!: string;

  @Column({ type: 'bytea', nullable: true })
  readonly data?: string;

  @Index()
  @Column({ type: 'simple-array', nullable: true })
  readonly impacted?: string[];

  @Index()
  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
