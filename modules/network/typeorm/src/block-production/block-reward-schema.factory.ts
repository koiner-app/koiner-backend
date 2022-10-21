import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { BlockReward, BlockRewardProps } from '@koiner/network/domain';
import { BlockRewardSchema } from '.';
import * as math from 'mathjs';

export class BlockRewardSchemaFactory extends EntitySchemaFactory<
  BlockReward,
  BlockRewardSchema
> {
  protected toDomainProps(
    entitySchema: BlockRewardSchema
  ): EntityProps<BlockRewardProps> {
    const id = new UUID(entitySchema.id);

    const props: BlockRewardProps = {
      blockId: new KoinosId(entitySchema.block_id),
      blockHeight: entitySchema.block_height,
      producerId: new KoinosAddressId(entitySchema.producer_id),
      value: parseInt(entitySchema.value),
      burnedValue: parseInt(entitySchema.burned_value),
      roi: math.evaluate(entitySchema.roi),
      timestamp: entitySchema.timestamp,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: BlockReward
  ): EntitySchemaProps<BlockRewardSchema> {
    const props = entity.getPropsCopy();

    return {
      block_id: props.blockId.value,
      block_height: props.blockHeight,
      producer_id: props.producerId.value,
      value: props.value.toString(),
      burned_value: props.burnedValue.toString(),
      roi: props.roi.toString().padStart(8, '0'),
      timestamp: props.timestamp,
    };
  }
}
