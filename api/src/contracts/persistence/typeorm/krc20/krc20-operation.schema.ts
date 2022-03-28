import { EntityBaseSchema } from '@appvise/typeorm';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { OperationSchema } from '@koiner/chain/persistence/typeorm';
import { Krc20ContractSchema } from '@koiner/contracts/persistence/typeorm';

@Entity('krc20_operation')
export class Krc20OperationSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 34 })
  readonly id: string;

  // Add foreign key without the need to always use the relation
  @OneToOne(() => OperationSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  private _operation_id_fg: never;

  @Column({ length: 34 })
  readonly contract_id: string;

  // Add foreign key without the need to always use the relation
  @ManyToOne(() => Krc20ContractSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  private _contract_id_fg: never;

  @Column({ length: 8 })
  readonly name: string;

  @Column({ length: 34, nullable: true })
  readonly from: string;

  @Column({ length: 34 })
  readonly to: string;

  @Column({ length: 20 })
  readonly value: string;
}
