import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity } from 'typeorm';

@Entity('log_event_log')
export class EventLogSchema extends EntityBaseSchema {
  @Column()
  readonly event_name!: string;

  @Column({ type: 'jsonb', nullable: true })
  readonly data?: Record<string, any>;

  @Column()
  readonly item_id!: string;

  @Column()
  readonly item_type!: string;

  @Column({ type: 'bigint' })
  readonly timestamp!: number;

  @Column({ type: 'smallint' })
  readonly count!: number;
}
