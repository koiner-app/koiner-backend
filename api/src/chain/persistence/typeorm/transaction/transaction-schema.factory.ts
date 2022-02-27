import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { Transaction, TransactionProps } from '@koiner/chain/domain';
import { TransactionSchema } from './transaction.schema';
import { KoinosId } from '@koiner/domain';
import { TransactionHeader } from '@koiner/chain/domain';

export class TransactionSchemaFactory extends EntitySchemaFactory<
  Transaction,
  TransactionSchema
> {
  protected toDomainProps(
    entitySchema: TransactionSchema,
  ): EntityProps<TransactionProps> {
    const id = new KoinosId(entitySchema.id);

    const props: TransactionProps = {
      blockHeight: entitySchema.block_height,
      header: new TransactionHeader({
        rcLimit: entitySchema.rc_limit,
        nonce: entitySchema.nonce,
        operationMerkleRoot: entitySchema.operation_merkle_root,
        signer: entitySchema.signer,
      }),
      signature: entitySchema.signature,
      transactionIndex: entitySchema.transaction_index,
      operationCount: entitySchema.operation_count,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: Transaction,
  ): EntitySchemaProps<TransactionSchema> {
    const props = entity.getPropsCopy();

    return {
      block_height: props.blockHeight,
      rc_limit: props.header.rcLimit,
      nonce: props.header.nonce,
      operation_merkle_root: props.header.operationMerkleRoot,
      signer: props.header.signer,
      signature: props.signature,
      transaction_index: props.transactionIndex,
      operation_count: props.operationCount,
    };
  }
}
