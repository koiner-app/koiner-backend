import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import { TokenBalance, TokenBalanceProps } from '@koiner/contracts/domain';
import { TokenBalanceSchema } from '.';

export class TokenBalanceSchemaFactory extends EntitySchemaFactory<
  TokenBalance,
  TokenBalanceSchema
> {
  protected toDomainProps(
    entitySchema: TokenBalanceSchema,
  ): EntityProps<TokenBalanceProps> {
    const id = new UUID(entitySchema.id);

    const props: TokenBalanceProps = {
      contractId: new KoinosAddressId(entitySchema.contract_id),
      addressId: new KoinosAddressId(entitySchema.address_id),
      balance: parseInt(entitySchema.balance),
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: TokenBalance,
  ): EntitySchemaProps<TokenBalanceSchema> {
    const props = entity.getPropsCopy();

    return {
      contract_id: props.contractId.value,
      address_id: props.addressId.value,
      balance: String(props.balance).padStart(20, '0'),
    };
  }
}
