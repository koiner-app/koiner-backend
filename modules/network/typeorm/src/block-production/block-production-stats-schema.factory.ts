import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import {
  BlockProductionStats,
  BlockProductionStatsProps,
} from '@koiner/network/domain';
import { BlockProductionStatsSchema } from '.';
import * as math from 'mathjs';

export class BlockProductionStatsSchemaFactory extends EntitySchemaFactory<
  BlockProductionStats,
  BlockProductionStatsSchema
> {
  protected toDomainProps(
    entitySchema: BlockProductionStatsSchema
  ): EntityProps<BlockProductionStatsProps> {
    const id = new UUID(entitySchema.id);

    const props: BlockProductionStatsProps = {
      contractId: new KoinosAddressId(entitySchema.contract_id),
      rewarded: parseInt(entitySchema.rewarded),
      mintedTotal: parseInt(entitySchema.minted_total),
      burnedTotal: parseInt(entitySchema.burned_total),
      roi: math.evaluate(entitySchema.roi),
      blocksProduced: parseInt(entitySchema.blocks_produced),
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: BlockProductionStats
  ): EntitySchemaProps<BlockProductionStatsSchema> {
    const props = entity.getPropsCopy();

    return {
      contract_id: props.contractId.value,
      rewarded: String(props.rewarded).padStart(20, '0'),
      minted_total: String(props.mintedTotal).padStart(20, '0'),
      burned_total: String(props.burnedTotal).padStart(20, '0'),
      roi: props.roi.toString().padStart(8, '0'),
      blocks_produced: String(props.blocksProduced).padStart(20, '0'),
    };
  }
}
