import { EntityBaseSchema } from '@appvise/typeorm';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { OperationSchema } from '@koiner/chain/persistence/typeorm';

@Entity('chain_upload_contract_operation')
export class UploadContractOperationSchema extends EntityBaseSchema {
  @PrimaryColumn()
  @Column({ length: 34 })
  readonly id: string;

  // Add foreign key without the need to always use the relation
  @OneToOne(() => OperationSchema, { nullable: false, persistence: false })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  private _operation_id_fg: never;

  @Column({ length: 34 })
  readonly contract_id: string;

  @Column({ type: 'bytea' })
  readonly bytecode: string;

  @Column({ type: 'text', nullable: true })
  readonly abi: string;
}
