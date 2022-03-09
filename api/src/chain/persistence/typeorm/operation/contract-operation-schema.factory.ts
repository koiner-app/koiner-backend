import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import {
  ContractOperation,
  ContractOperationProps,
} from '@koiner/chain/domain';
import { ContractOperationSchema } from './contract-operation.schema';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';

export class ContractOperationSchemaFactory extends EntitySchemaFactory<
  ContractOperation,
  ContractOperationSchema
> {
  protected toDomainProps(
    entitySchema: ContractOperationSchema,
  ): EntityProps<ContractOperationProps> {
    const id = new UUID(entitySchema.id);

    const props: ContractOperationProps = {
      contractId: new KoinosAddressId(entitySchema.contract_id),
      entryPoint: entitySchema.entry_point,
      args: entitySchema.args,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: ContractOperation,
  ): EntitySchemaProps<ContractOperationSchema> {
    const props = entity.getPropsCopy();

    return {
      contract_id: props.contractId.value,
      entry_point: props.entryPoint,
      args: props.args,
    };
  }
}
