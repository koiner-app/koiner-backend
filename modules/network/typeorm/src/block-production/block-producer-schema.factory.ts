import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import { BlockProducer, BlockProducerProps } from '@koiner/network/domain';
import { BlockProducerSchema } from '.';
import * as math from 'mathjs';

export class BlockProducerSchemaFactory extends EntitySchemaFactory<
  BlockProducer,
  BlockProducerSchema
> {
  protected toDomainProps(
    entitySchema: BlockProducerSchema
  ): EntityProps<BlockProducerProps> {
    const id = new UUID(entitySchema.id);

    const props: BlockProducerProps = {
      contractId: new KoinosAddressId(entitySchema.contract_id),
      addressId: new KoinosAddressId(entitySchema.address_id),
      balance: parseInt(entitySchema.balance),
      mintedTotal: parseInt(entitySchema.minted_total),
      burnedTotal: parseInt(entitySchema.burned_total),
      roi: math.evaluate(entitySchema.roi),
      blocksProduced: parseInt(entitySchema.blocks_produced),
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: BlockProducer
  ): EntitySchemaProps<BlockProducerSchema> {
    const props = entity.getPropsCopy();

    return {
      contract_id: props.contractId.value,
      address_id: props.addressId.value,
      balance: String(props.balance).padStart(20, '0'),
      minted_total: String(props.mintedTotal).padStart(20, '0'),
      burned_total: String(props.burnedTotal).padStart(20, '0'),
      roi: props.roi.toString().padStart(8, '0'),
      blocks_produced: String(props.blocksProduced).padStart(20, '0'),
    };
  }
}
