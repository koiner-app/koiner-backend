import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { Krc20Balance, Krc20BalanceProps } from '@koiner/contracts/domain';
import { Krc20BalanceSchema } from './krc20-balance.schema';
import { KoinosAddressId } from '@koiner/domain';
import { UUID } from '@appvise/domain';

export class Krc20BalanceSchemaFactory extends EntitySchemaFactory<
  Krc20Balance,
  Krc20BalanceSchema
> {
  protected toDomainProps(
    entitySchema: Krc20BalanceSchema,
  ): EntityProps<Krc20BalanceProps> {
    const id = new UUID(entitySchema.id);

    const props: Krc20BalanceProps = {
      contractId: new KoinosAddressId(entitySchema.contract_id),
      addressId: new KoinosAddressId(entitySchema.address_id),
      balance: parseInt(entitySchema.balance),
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: Krc20Balance,
  ): EntitySchemaProps<Krc20BalanceSchema> {
    const props = entity.getPropsCopy();

    return {
      contract_id: props.contractId.value,
      address_id: props.addressId.value,
      balance: props.balance.toString(),
    };
  }
}
