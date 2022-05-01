import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import {
  TokenContract,
  TokenContractProps,
  TokenContractStatistics,
} from '@koiner/contracts/domain';
import { TokenContractSchema } from './token-contract.schema';
import { KoinosAddressId, KoinosId } from '@koiner/domain';

export class TokenContractSchemaFactory extends EntitySchemaFactory<
  TokenContract,
  TokenContractSchema
> {
  protected toDomainProps(
    entitySchema: TokenContractSchema,
  ): EntityProps<TokenContractProps> {
    const id = new KoinosAddressId(entitySchema.id);

    const props: TokenContractProps = {
      blockHeight: entitySchema.block_height,
      transactionId: new KoinosId(entitySchema.transaction_id),
      operationIndex: entitySchema.operation_index,
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
      block_height: props.blockHeight,
      transaction_id: props.transactionId.value,
      operation_index: props.operationIndex,
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
