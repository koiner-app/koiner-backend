import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import { Address, AddressProps } from '@koiner/contracts/domain';
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
    };

    return { id, props };
  }

  protected toSchemaProps(entity: Address): EntitySchemaProps<AddressSchema> {
    const props = entity.getPropsCopy();

    return {
      is_producer: props.isProducer,
    };
  }
}
