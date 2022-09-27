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
      burnerId: entitySchema.burner_id
        ? new KoinosAddressId(entitySchema.burner_id)
        : undefined,
      burnedValue: entitySchema.burned_value
        ? parseInt(entitySchema.burned_value)
        : undefined,
      roi: entitySchema.roi ? math.evaluate(entitySchema.roi) : undefined,
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
      burner_id: props.burnerId ? props.burnerId.value : undefined,
      burned_value: props.burnedValue
        ? props.burnedValue.toString()
        : undefined,
      roi: props.roi ? props.roi.toString().padStart(8, '0') : undefined,
      timestamp: props.timestamp,
    };
  }
}
