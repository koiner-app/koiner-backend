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
      stats: new AddressStatistics({
        contractCount: entitySchema.contract_count,
        operationCount: entitySchema.operation_count,
        transactionCount: entitySchema.transaction_count,
      }),
    };

    return { id, props };
  }

  protected toSchemaProps(entity: Address): EntitySchemaProps<AddressSchema> {
    const props = entity.getPropsCopy();

    return {
      contract_count: props.stats.transactionCount,
      operation_count: props.stats.transactionCount,
      transaction_count: props.stats.transactionCount,
    };
  }
}
