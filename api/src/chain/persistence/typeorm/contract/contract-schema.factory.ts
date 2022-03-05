import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { Contract, ContractProps } from '@koiner/chain/domain';
import { ContractSchema } from './contract.schema';
import { KoinosAddressId, KoinosId } from '@koiner/domain';

export class ContractSchemaFactory extends EntitySchemaFactory<
  Contract,
  ContractSchema
> {
  protected toDomainProps(
    entitySchema: ContractSchema,
  ): EntityProps<ContractProps> {
    const id = new KoinosAddressId(entitySchema.id);

    const props: ContractProps = {
      blockHeight: entitySchema.block_height,
      transactionId: new KoinosId(entitySchema.transaction_id),
      operationIndex: entitySchema.operation_index,
      bytecode: entitySchema.bytecode,
      abi: entitySchema.abi,
    };

    return { id, props };
  }

  protected toSchemaProps(entity: Contract): EntitySchemaProps<ContractSchema> {
    const props = entity.getPropsCopy();

    return {
      block_height: props.blockHeight,
      transaction_id: props.transactionId.value,
      operation_index: props.operationIndex,
      bytecode: props.bytecode,
      abi: props.abi,
    };
  }
}
