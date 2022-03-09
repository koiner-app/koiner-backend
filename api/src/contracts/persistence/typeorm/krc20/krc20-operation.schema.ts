import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { OperationSchema } from '@koiner/chain/persistence/typeorm';

@Entity('krc20_operation')
export class Krc20OperationSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 34 })
  readonly id: string;

  // Add foreign key without the need to always use the relation
  @OneToOne(() => OperationSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  private _operation_id_fg: never;

  @Column({ length: 8 })
  readonly name: string;

  @Column({ length: 34 })
  readonly from: string;

  @Column({ length: 34 })
  readonly to: string;

  @Column({ length: 20 })
  readonly value: string;
}
