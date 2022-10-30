import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sync_stop_signal')
export class StopSignalSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 46 })
  override readonly id!: string;

  @Column({ type: 'bigint' })
  readonly stop_at_height!: number;
}
