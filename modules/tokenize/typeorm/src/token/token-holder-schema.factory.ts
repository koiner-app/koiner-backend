import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import { TokenHolder, TokenHolderProps } from '@koiner/tokenize/domain';
import { TokenHolderSchema } from '.';

export class TokenHolderSchemaFactory extends EntitySchemaFactory<
  TokenHolder,
  TokenHolderSchema
> {
  protected toDomainProps(
    entitySchema: TokenHolderSchema
  ): EntityProps<TokenHolderProps> {
    const id = new UUID(entitySchema.id);

    // Because token events are processed async it can occur that a balance
    // is negative during processing
    let balanceStr = entitySchema.balance;
    let negative = false;
    if (balanceStr.includes('-')) {
      negative = true;
      balanceStr = balanceStr.replace('-', '');
    }

    const props: TokenHolderProps = {
      addressId: new KoinosAddressId(entitySchema.address_id),
      contractId: new KoinosAddressId(entitySchema.contract_id),
      balance: negative ? -parseInt(balanceStr) : +parseInt(balanceStr),
      burnCount: parseInt(entitySchema.burn_count.toString()),
      mintCount: parseInt(entitySchema.mint_count.toString()),
      transferInCount: parseInt(entitySchema.transfer_in_count.toString()),
      transferOutCount: parseInt(entitySchema.transfer_out_count.toString()),
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: TokenHolder
  ): EntitySchemaProps<TokenHolderSchema> {
    const props = entity.getPropsCopy();

    return {
      address_id: props.addressId.value,
      contract_id: props.contractId.value,
      balance: String(props.balance).padStart(20, '0'),
      burn_count: props.burnCount,
      mint_count: props.mintCount,
      transfer_in_count: props.transferInCount,
      transfer_out_count: props.transferOutCount,
    };
  }
}
