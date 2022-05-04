import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TransactionSchema } from '@koiner/chain/persistence/typeorm';

@Entity('chain_event')
export class EventSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 70 })
  readonly transaction_id: string;

  @ManyToOne(() => TransactionSchema)
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  readonly transaction: TransactionSchema;

  @PrimaryColumn()
  @Column({ type: 'smallint' })
  readonly sequence: number;

  @Column({ length: 34, nullable: true })
  readonly contract_id: string;

  @Column()
  readonly name: string;

  @Column({ type: 'bytea' })
  readonly data: string;

  @Column({ type: 'simple-array', nullable: true })
  readonly impacted: string[];
}
