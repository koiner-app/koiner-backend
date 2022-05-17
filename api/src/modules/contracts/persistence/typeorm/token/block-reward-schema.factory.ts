import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import { BlockReward, BlockRewardProps } from '@koiner/contracts/domain';
import { BlockRewardSchema } from '.';

export class BlockRewardSchemaFactory extends EntitySchemaFactory<
  BlockReward,
  BlockRewardSchema
> {
  protected toDomainProps(
    entitySchema: BlockRewardSchema,
  ): EntityProps<BlockRewardProps> {
    const id = new UUID(entitySchema.id);

    const props: BlockRewardProps = {
      blockHeight: entitySchema.block_height,
      producerId: new KoinosAddressId(entitySchema.producer_id),
      value: parseInt(entitySchema.value),
      contractId: new KoinosAddressId(entitySchema.contract_id),
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: BlockReward,
  ): EntitySchemaProps<BlockRewardSchema> {
    const props = entity.getPropsCopy();

    return {
      block_height: props.blockHeight,
      producer_id: props.producerId.value,
      value: props.value.toString(),
      contract_id: props.contractId.value,
    };
  }
}
