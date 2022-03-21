import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { Krc20Operation, Krc20OperationProps } from '@koiner/contracts/domain';
import { Krc20OperationSchema } from './krc20-operation.schema';
import { KoinosAddressId } from '@koiner/domain';
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
      name: entitySchema.name,
      from: entitySchema.from
        ? new KoinosAddressId(entitySchema.from)
        : undefined,
      to: new KoinosAddressId(entitySchema.to),
      value: entitySchema.value,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: Krc20Operation,
  ): EntitySchemaProps<Krc20OperationSchema> {
    const props = entity.getPropsCopy();

    return {
      name: props.name,
      from: props.from ? props.from.value : undefined,
      to: props.to.value,
      value: props.value,
    };
  }
}
