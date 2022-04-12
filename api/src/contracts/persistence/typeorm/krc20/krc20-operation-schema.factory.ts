import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { Krc20Operation, Krc20OperationProps } from '@koiner/contracts/domain';
import { Krc20OperationSchema } from './krc20-operation.schema';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { UUID } from '@appvise/domain';

export class Krc20OperationSchemaFactory extends EntitySchemaFactory<
  Krc20Operation,
  Krc20OperationSchema
> {
  protected toDomainProps(
    entitySchema: Krc20OperationSchema,
  ): EntityProps<Krc20OperationProps> {
    const id = new UUID(entitySchema.id);

    const props: Krc20OperationProps = {
      contractId: new KoinosAddressId(entitySchema.contract_id),
      transactionId: new KoinosId(entitySchema.transaction_id),
      name: entitySchema.name,
      from: entitySchema.from
        ? new KoinosAddressId(entitySchema.from)
        : undefined,
      to: new KoinosAddressId(entitySchema.to),
      value: parseInt(entitySchema.value),
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: Krc20Operation,
  ): EntitySchemaProps<Krc20OperationSchema> {
    const props = entity.getPropsCopy();

    return {
      contract_id: props.contractId.value,
      transaction_id: props.transactionId.value,
      name: props.name,
      from: props.from ? props.from.value : undefined,
      to: props.to.value,
      value: props.value.toString(),
    };
  }
}
