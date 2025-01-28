import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { ContractStandardType } from '@koiner/contracts/standards';
import {
  ContractOperation,
  ContractOperationProps,
} from '@koiner/contracts/domain';
import { ContractOperationSchema } from '.';

export class ContractOperationSchemaFactory extends EntitySchemaFactory<
  ContractOperation,
  ContractOperationSchema
> {
  protected toDomainProps(
    entitySchema: ContractOperationSchema
  ): EntityProps<ContractOperationProps> {
    const id = new UUID(entitySchema.id);

    const props: ContractOperationProps = {
      blockHeight: entitySchema.block_height,
      contractId: new KoinosAddressId(entitySchema.contract_id),
      transactionId: new KoinosId(entitySchema.transaction_id),
      entryPoint: entitySchema.entry_point,
      args: entitySchema.args
        ? (entitySchema.args as unknown as Uint8Array).toString()
        : undefined,
      data: entitySchema.data,
      name: entitySchema.name,
      contractStandardType: entitySchema.contract_standard_type,
      timestamp: entitySchema.timestamp,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: ContractOperation
  ): EntitySchemaProps<ContractOperationSchema> {
    const props = entity.getPropsCopy();

    return {
      block_height: props.blockHeight,
      contract_id: props.contractId.value,
      transaction_id: props.transactionId.value,
      entry_point: props.entryPoint,
      args: props.args,
      name: props.name,
      data:
        typeof props.data === 'string'
          ? JSON.parse(props.data as unknown as string)
          : props.data,
      contract_standard_type:
        props.contractStandardType as ContractStandardType,
      timestamp: props.timestamp,
    };
  }
}
