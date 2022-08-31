import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity } from 'typeorm';
import { EventParentType } from '@koiner/chain/domain';

@Entity('chain_event')
export class EventSchema extends EntityBaseSchema {
  @Column({ length: 70 })
  readonly parent_id!: string;

  @Column({ type: 'enum', enum: EventParentType })
  readonly parent_type!: EventParentType;

  @Column({ type: 'smallint', nullable: true })
  readonly sequence?: number;

  @Column({ length: 35, nullable: true })
  readonly contract_id?: string;

  @Column()
  readonly name!: string;

  @Column({ type: 'bytea', nullable: true })
  readonly data?: string;

  @Column({ type: 'simple-array', nullable: true })
  readonly impacted?: string[];

  @Column({ type: 'bigint' })
  readonly timestamp!: number;
}
