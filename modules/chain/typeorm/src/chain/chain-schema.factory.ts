import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { ChainId } from '@koiner/domain';
import { Chain, ChainProps, ChainStats } from '@koiner/chain/domain';
import { ChainSchema } from '.';

export class ChainSchemaFactory extends EntitySchemaFactory<
  Chain,
  ChainSchema
> {
  protected toDomainProps(entitySchema: ChainSchema): EntityProps<ChainProps> {
    const id = new ChainId(entitySchema.id);

    const props: ChainProps = {
      stats: new ChainStats({
        addressCount: parseInt(entitySchema.address_count.toString()),
        operationCount: parseInt(entitySchema.operation_count.toString()),
        transactionCount: parseInt(entitySchema.transaction_count.toString()),
      }),
      timestamp: entitySchema.timestamp,
    };

    return { id, props };
  }

  protected toSchemaProps(entity: Chain): EntitySchemaProps<ChainSchema> {
    const props = entity.getPropsCopy();

    return {
      address_count: props.stats.addressCount,
      operation_count: props.stats.operationCount,
      transaction_count: props.stats.transactionCount,
      timestamp: props.timestamp,
    };
  }
}
