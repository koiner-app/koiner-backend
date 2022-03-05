import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { Krc20Contract, Krc20ContractProps } from '@koiner/contracts/domain';
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
    };
  }
}
