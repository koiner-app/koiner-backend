import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { Block, BlockProps, BlockReceipt } from '@koiner/chain/domain';
import { BlockSchema } from './block.schema';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { BlockHeader } from '@koiner/chain/domain';

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
      producerId: new KoinosAddressId(entitySchema.producer_id),
      producerRewards: parseInt(entitySchema.producer_rewards),
      receipt: new BlockReceipt({
        diskStorageUsed: entitySchema.disk_storage_used,
        networkBandwidthUsed: entitySchema.network_bandwidth_used,
        computeBandwidthUsed: entitySchema.compute_bandwidth_used,
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
      producer_id: props.producerId.value,
      producer_rewards: props.producerRewards.toString(),
      disk_storage_used: props.receipt.diskStorageUsed,
      network_bandwidth_used: props.receipt.networkBandwidthUsed,
      compute_bandwidth_used: props.receipt.computeBandwidthUsed,
      event_count: props.receipt.eventCount,
    };
  }
}
