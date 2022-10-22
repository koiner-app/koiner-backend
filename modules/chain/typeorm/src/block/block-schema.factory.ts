import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosId } from '@koiner/domain';
import {
  Block,
  BlockHeader,
  BlockProps,
  BlockReceipt,
} from '@koiner/chain/domain';
import { BlockSchema } from '.';

export class BlockSchemaFactory extends EntitySchemaFactory<
  Block,
  BlockSchema
> {
  protected toDomainProps(entitySchema: BlockSchema): EntityProps<BlockProps> {
    const id = new KoinosId(entitySchema.id);

    const props: BlockProps = {
      header: new BlockHeader({
        previous: entitySchema.previous,
        height: entitySchema.height,
        timestamp: entitySchema.timestamp,
        previousStateMerkleRoot: entitySchema.previous_state_merkle_root,
        transactionMerkleRoot: entitySchema.transaction_merkle_root,
        signer: entitySchema.signer,
      }),
      signature: entitySchema.signature,
      transactionCount: entitySchema.transaction_count,
      receipt: new BlockReceipt({
        diskStorageUsed: parseInt(entitySchema.disk_storage_used),
        networkBandwidthUsed: parseInt(entitySchema.network_bandwidth_used),
        computeBandwidthUsed: parseInt(entitySchema.compute_bandwidth_used),
        eventCount: entitySchema.event_count,
      }),
    };

    return { id, props };
  }

  protected toSchemaProps(entity: Block): EntitySchemaProps<BlockSchema> {
    const props = entity.getPropsCopy();

    return {
      previous: props.header.previous,
      height: props.header.height,
      timestamp: props.header.timestamp,
      previous_state_merkle_root: props.header.previousStateMerkleRoot,
      transaction_merkle_root: props.header.transactionMerkleRoot,
      signer: props.header.signer,
      signature: props.signature,
      transaction_count: props.transactionCount,
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
    };
  }
}
