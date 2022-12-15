import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { ChainId } from '@koiner/domain';
import { KoinStats, KoinStatsProps } from '@koiner/tokenize/domain';
import { KoinStatsSchema } from '.';

export class KoinStatsSchemaFactory extends EntitySchemaFactory<
  KoinStats,
  KoinStatsSchema
> {
  protected toDomainProps(
    entitySchema: KoinStatsSchema
  ): EntityProps<KoinStatsProps> {
    const id = new ChainId(entitySchema.id);

    const props: KoinStatsProps = {
      timestamp: entitySchema.timestamp,
      price: entitySchema.price,
      bidPrice: entitySchema.bid_price,
      bidQuantity: entitySchema.bid_quantity,
      askPrice: entitySchema.ask_price,
      askQuantity: entitySchema.ask_quantity,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: KoinStats
  ): EntitySchemaProps<KoinStatsSchema> {
    const props = entity.getPropsCopy();

    return {
      timestamp: props.timestamp,
      price: props.price,
      bid_price: props.bidPrice,
      bid_quantity: props.bidQuantity,
      ask_price: props.askPrice,
      ask_quantity: props.askQuantity,
    };
  }
}
