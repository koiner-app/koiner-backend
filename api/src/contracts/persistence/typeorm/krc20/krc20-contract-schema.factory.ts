import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import {
  Krc20Contract,
  Krc20ContractProps,
  Krc20ContractStatistics,
} from '@koiner/contracts/domain';
import { Krc20ContractSchema } from './krc20-contract.schema';
import { KoinosAddressId, KoinosId } from '@koiner/domain';

export class Krc20ContractSchemaFactory extends EntitySchemaFactory<
  Krc20Contract,
  Krc20ContractSchema
> {
  protected toDomainProps(
    entitySchema: Krc20ContractSchema,
  ): EntityProps<Krc20ContractProps> {
    const id = new KoinosAddressId(entitySchema.id);

    const props: Krc20ContractProps = {
      blockHeight: entitySchema.block_height,
      transactionId: new KoinosId(entitySchema.transaction_id),
      operationIndex: entitySchema.operation_index,
      name: entitySchema.name,
      symbol: entitySchema.symbol,
      decimals: entitySchema.decimals,
      totalSupply: parseInt(entitySchema.total_supply),
      stats: new Krc20ContractStatistics({
        holderCount: entitySchema.holder_count,
        operationCount: entitySchema.operation_count,
        mintCount: entitySchema.mint_count,
        transferCount: entitySchema.transfer_count,
      }),
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: Krc20Contract,
  ): EntitySchemaProps<Krc20ContractSchema> {
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
