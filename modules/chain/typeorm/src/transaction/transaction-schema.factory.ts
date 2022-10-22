import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosId } from '@koiner/domain';
import {
  Operation,
  Transaction,
  TransactionHeader,
  TransactionProps,
  TransactionReceipt,
} from '@koiner/chain/domain';
import { OperationSchema } from '../operation';
import { TransactionSchema } from '.';

export class TransactionSchemaFactory extends EntitySchemaFactory<
  Transaction,
  TransactionSchema
> {
  protected toDomainProps(
    entitySchema: TransactionSchema
  ): EntityProps<TransactionProps> {
    const id = new KoinosId(entitySchema.id);

    const props: TransactionProps = {
      blockHeight: entitySchema.block_height,
      signatures: entitySchema.signatures,
      transactionIndex: entitySchema.transaction_index,
      operations: entitySchema.operations
        ? entitySchema.operations.map((operationSchema) => {
            return new Operation({
              id: new UUID(operationSchema.id),
              props: {
                blockHeight: operationSchema.block_height,
                transactionId: new KoinosId(operationSchema.transaction_id),
                operationIndex: operationSchema.operation_index,
                type: operationSchema.type,
                timestamp: operationSchema.timestamp,
              },
            });
          })
        : [],
      operationCount: entitySchema.operation_count,
      timestamp: entitySchema.timestamp,
      header: new TransactionHeader({
        rcLimit: parseInt(entitySchema.rc_limit),
        nonce: entitySchema.nonce,
        operationMerkleRoot: entitySchema.operation_merkle_root,
        payer: entitySchema.payer,
        payee: entitySchema.payee,
      }),
      receipt: new TransactionReceipt({
        payer: entitySchema.payer,
        maxPayerRc: parseInt(entitySchema.max_payer_rc),
        rcLimit: parseInt(entitySchema.rc_limit),
        rcUsed: parseInt(entitySchema.rc_used),
        diskStorageUsed: parseInt(entitySchema.disk_storage_used),
        networkBandwidthUsed: parseInt(entitySchema.network_bandwidth_used),
        computeBandwidthUsed: parseInt(entitySchema.compute_bandwidth_used),
        eventCount: entitySchema.event_count,
        reverted: entitySchema.reverted,
      }),
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: Transaction
  ): EntitySchemaProps<TransactionSchema> {
    const props = entity.getPropsCopy();

    return {
      block_height: props.blockHeight,
      operations: props.operations.map((operation) => {
        return new OperationSchema({
          id: operation.id.value,
          block_height: operation.blockHeight,
          transaction_id: operation.transactionId.value,
          operation_index: operation.operationIndex,
          type: operation.type,
          timestamp: operation.timestamp,
        });
      }),
      operation_count: props.operationCount,
      signatures: props.signatures,
      transaction_index: props.transactionIndex,
      timestamp: props.timestamp,

      // Header
      rc_limit: String(props.header.rcLimit).padStart(20, '0'),
      nonce: props.header.nonce,
      operation_merkle_root: props.header.operationMerkleRoot,
      payer: props.header.payer,
      payee: props.header.payee,

      // Receipt
      max_payer_rc: String(props.receipt.maxPayerRc).padStart(20, '0'),
      rc_used: String(props.receipt.rcUsed).padStart(20, '0'),
      disk_storage_used: String(props.receipt.diskStorageUsed).padStart(
        20,
        '0'
      ),
      network_bandwidth_used: String(
        props.receipt.networkBandwidthUsed
      ).padStart(20, '0'),
      compute_bandwidth_used: String(
        props.receipt.computeBandwidthUsed
      ).padStart(20, '0'),
      event_count: props.receipt.eventCount,
      reverted: props.receipt.reverted,
    };
  }
}
