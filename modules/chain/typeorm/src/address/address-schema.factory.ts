import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import { Address, AddressProps } from '@koiner/chain/domain';
import { AddressSchema } from '.';

export class AddressSchemaFactory extends EntitySchemaFactory<
  Address,
  AddressSchema
> {
  protected toDomainProps(
    entitySchema: AddressSchema
  ): EntityProps<AddressProps> {
    const id = new KoinosAddressId(entitySchema.id);

    const props: AddressProps = {
      isProducer: entitySchema.is_producer,
      isContract: entitySchema.is_contract,
      isTokenContract: entitySchema.is_token_contract,
      timestamp: entitySchema.timestamp,
    };

    return { id, props };
  }

  protected toSchemaProps(entity: Address): EntitySchemaProps<AddressSchema> {
    const props = entity.getPropsCopy();

    return {
      is_producer: props.isProducer,
      is_contract: props.isContract,
      is_token_contract: props.isTokenContract,
      timestamp: props.timestamp,
    };
  }
}
