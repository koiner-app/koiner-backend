import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import { TokenContract, TokenContractProps } from '@koiner/tokenize/domain';
import { TokenContractSchema } from '.';

export class TokenContractSchemaFactory extends EntitySchemaFactory<
  TokenContract,
  TokenContractSchema
> {
  protected toDomainProps(
    entitySchema: TokenContractSchema
  ): EntityProps<TokenContractProps> {
    const id = new KoinosAddressId(entitySchema.id);

    const props: TokenContractProps = {
      name: entitySchema.name,
      symbol: entitySchema.symbol,
      decimals: entitySchema.decimals,
      totalSupply: parseInt(entitySchema.total_supply),
      burnCount: parseInt(entitySchema.burn_count.toString()),
      mintCount: parseInt(entitySchema.mint_count.toString()),
      transferCount: parseInt(entitySchema.transfer_count.toString()),
      timestamp: entitySchema.timestamp,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: TokenContract
  ): EntitySchemaProps<TokenContractSchema> {
    const props = entity.getPropsCopy();

    return {
      name: props.name,
      symbol: props.symbol,
      decimals: props.decimals,
      total_supply: String(props.totalSupply).padStart(20, '0'),
      burn_count: props.burnCount,
      mint_count: props.mintCount,
      transfer_count: props.transferCount,
      timestamp: props.timestamp,
    };
  }
}
