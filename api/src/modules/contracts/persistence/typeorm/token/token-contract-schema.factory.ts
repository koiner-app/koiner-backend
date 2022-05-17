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
    entitySchema: TokenContractSchema,
  ): EntityProps<TokenContractProps> {
    const id = new KoinosAddressId(entitySchema.id);

    const props: TokenContractProps = {
      name: entitySchema.name,
      symbol: entitySchema.symbol,
      decimals: entitySchema.decimals,
      totalSupply: parseInt(entitySchema.total_supply),
      stats: new TokenContractStatistics({
        holderCount: entitySchema.holder_count,
        operationCount: entitySchema.operation_count,
        mintCount: entitySchema.mint_count,
        transferCount: entitySchema.transfer_count,
      }),
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: TokenContract,
  ): EntitySchemaProps<TokenContractSchema> {
    const props = entity.getPropsCopy();

    return {
      name: props.name,
      symbol: props.symbol,
      decimals: props.decimals,
      total_supply: props.totalSupply.toString(),
      holder_count: props.stats.holderCount,
      operation_count: props.stats.operationCount,
      mint_count: props.stats.mintCount,
      transfer_count: props.stats.transferCount,
    };
  }
}
