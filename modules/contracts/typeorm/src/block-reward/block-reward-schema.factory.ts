import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import { BlockReward, BlockRewardProps } from '@koiner/contracts/domain';
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
      blockHeight: entitySchema.block_height,
      producerId: new KoinosAddressId(entitySchema.producer_id),
      contractId: new KoinosAddressId(entitySchema.contract_id),
      value: parseInt(entitySchema.value),
      burnedContractId: entitySchema.burned_contract_id
        ? new KoinosAddressId(entitySchema.burned_contract_id)
        : undefined,
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
      block_height: props.blockHeight,
      producer_id: props.producerId.value,
      contract_id: props.contractId.value,
      value: props.value.toString(),
      burned_contract_id: props.burnedContractId
        ? props.burnedContractId.value
        : undefined,
      burner_id: props.burnerId ? props.burnerId.value : undefined,
      burned_value: props.burnedValue
        ? props.burnedValue.toString()
        : undefined,
      roi: props.roi ? props.roi.toString().padStart(8, '0') : undefined,
      timestamp: props.timestamp,
    };
  }
}
