import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { Operation, Transaction, TransactionProps } from '@koiner/chain/domain';
import { TransactionSchema } from './transaction.schema';
import { KoinosId } from '@koiner/domain';
import { TransactionHeader } from '@koiner/chain/domain';
import { OperationSchema } from '@koiner/chain/persistence/typeorm/operation/operation.schema';
import { UUID } from '@appvise/domain';

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
        payer: entitySchema.payer,
      }),
      signature: entitySchema.signature,
      transactionIndex: entitySchema.transaction_index,
      operations: entitySchema.operations
        ? entitySchema.operations.map((operationSchema) => {
            return Operation.create(
              {
                parentId: new UUID(operationSchema.id),
                blockHeight: operationSchema.block_height,
                transactionId: new KoinosId(operationSchema.transaction_id),
                operationIndex: operationSchema.operation_index,
                type: operationSchema.type,
              },
              new UUID(operationSchema.id),
            );
          })
        : [],
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
      payer: props.header.payer,
      signature: props.signature,
      transaction_index: props.transactionIndex,
      operations: props.operations.map((operation) => {
        return new OperationSchema({
          id: operation.id.value,
          block_height: operation.blockHeight,
          transaction_id: operation.transactionId.value,
          operation_index: operation.operationIndex,
          type: operation.type,
        });
      }),
      operation_count: props.operationCount,
    };
  }
}
