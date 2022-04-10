import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { Address, AddressProps, AddressStatistics } from '@koiner/chain/domain';
import { AddressSchema } from './address.schema';
import { KoinosAddressId } from '@koiner/domain';

export class AddressSchemaFactory extends EntitySchemaFactory<
  Address,
  AddressSchema
> {
  protected toDomainProps(
    entitySchema: AddressSchema,
  ): EntityProps<AddressProps> {
    const id = new KoinosAddressId(entitySchema.id);

    const props: AddressProps = {
      isProducer: entitySchema.is_producer,
      rewardsReceived: parseInt(entitySchema.rewards_received),
      stats: new AddressStatistics({
        blockCount: entitySchema.block_count,
        operationCount: entitySchema.operation_count,
        transactionCount: entitySchema.transaction_count,
      }),
    };

    return { id, props };
  }

  protected toSchemaProps(entity: Address): EntitySchemaProps<AddressSchema> {
    const props = entity.getPropsCopy();

    return {
      is_producer: props.isProducer,
      rewards_received: props.rewardsReceived.toString(),
      block_count: props.stats.blockCount,
      operation_count: props.stats.operationCount,
      transaction_count: props.stats.transactionCount,
    };
  }
}
