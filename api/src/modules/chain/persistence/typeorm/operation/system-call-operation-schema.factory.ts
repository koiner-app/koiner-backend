import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import {
  SystemCallOperation,
  SystemCallOperationProps,
} from '@koiner/chain/domain';
import { SystemCallOperationSchema } from '.';

export class SystemCallOperationSchemaFactory extends EntitySchemaFactory<
  SystemCallOperation,
  SystemCallOperationSchema
> {
  protected toDomainProps(
    entitySchema: SystemCallOperationSchema,
  ): EntityProps<SystemCallOperationProps> {
    const id = new UUID(entitySchema.id);

    const props: SystemCallOperationProps = {
      contractId: new KoinosAddressId(entitySchema.contract_id),
      callId: entitySchema.call_id,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: SystemCallOperation,
  ): EntitySchemaProps<SystemCallOperationSchema> {
    const props = entity.getPropsCopy();

    return {
      contract_id: props.contractId.value,
      call_id: props.callId,
    };
  }
}
