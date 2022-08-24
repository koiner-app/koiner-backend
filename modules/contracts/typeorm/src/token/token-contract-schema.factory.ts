import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import {
  TokenContract,
  TokenContractProps,
  TokenContractStatistics,
} from '@koiner/contracts/domain';
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
      stats: new TokenContractStatistics({
        holderCount: parseInt(entitySchema.holder_count),
        operationCount: parseInt(entitySchema.operation_count),
        mintCount: parseInt(entitySchema.mint_count),
        transferCount: parseInt(entitySchema.transfer_count),
      }),
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
      holder_count: String(props.stats.holderCount).padStart(20, '0'),
      operation_count: String(props.stats.operationCount).padStart(20, '0'),
      mint_count: String(props.stats.mintCount).padStart(20, '0'),
      transfer_count: String(props.stats.transferCount).padStart(20, '0'),
    };
  }
}
