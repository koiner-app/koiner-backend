import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import {
  UploadContractOperation,
  UploadContractOperationProps,
} from '@koiner/chain/domain';
import { UploadContractOperationSchema } from '.';

export class UploadContractOperationSchemaFactory extends EntitySchemaFactory<
  UploadContractOperation,
  UploadContractOperationSchema
> {
  protected toDomainProps(
    entitySchema: UploadContractOperationSchema,
  ): EntityProps<UploadContractOperationProps> {
    const id = new UUID(entitySchema.id);

    const props: UploadContractOperationProps = {
      contractId: new KoinosAddressId(entitySchema.contract_id),
      bytecode: entitySchema.bytecode,
      abi: entitySchema.abi,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: UploadContractOperation,
  ): EntitySchemaProps<UploadContractOperationSchema> {
    const props = entity.getPropsCopy();

    return {
      contract_id: props.contractId.value,
      bytecode: props.bytecode,
      abi: props.abi,
    };
  }
}
