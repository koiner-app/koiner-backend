import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import {
  SystemContractOperation,
  SystemContractOperationProps,
} from '@koiner/chain/domain';
import { SystemContractOperationSchema } from './system-contract-operation.schema';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';

export class SystemContractOperationSchemaFactory extends EntitySchemaFactory<
  SystemContractOperation,
  SystemContractOperationSchema
> {
  protected toDomainProps(
    entitySchema: SystemContractOperationSchema,
  ): EntityProps<SystemContractOperationProps> {
    const id = new UUID(entitySchema.id);

    const props: SystemContractOperationProps = {
      contractId: new KoinosAddressId(entitySchema.contract_id),
      systemContract: entitySchema.system_contract,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: SystemContractOperation,
  ): EntitySchemaProps<SystemContractOperationSchema> {
    const props = entity.getPropsCopy();

    return {
      contract_id: props.contractId.value,
      system_contract: props.systemContract,
    };
  }
}
