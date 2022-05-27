import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import {
  BlockRewardBalance,
  BlockRewardBalanceProps,
} from '@koiner/contracts/domain';
import { BlockRewardBalanceSchema } from '.';

export class BlockRewardBalanceSchemaFactory extends EntitySchemaFactory<
  BlockRewardBalance,
  BlockRewardBalanceSchema
> {
  protected toDomainProps(
    entitySchema: BlockRewardBalanceSchema,
  ): EntityProps<BlockRewardBalanceProps> {
    const id = new UUID(entitySchema.id);

    const props: BlockRewardBalanceProps = {
      contractId: new KoinosAddressId(entitySchema.contract_id),
      addressId: new KoinosAddressId(entitySchema.address_id),
      balance: parseInt(entitySchema.balance),
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: BlockRewardBalance,
  ): EntitySchemaProps<BlockRewardBalanceSchema> {
    const props = entity.getPropsCopy();

    return {
      contract_id: props.contractId.value,
      address_id: props.addressId.value,
      balance: String(props.balance).padStart(20, '0'),
    };
  }
}
