import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { TokenOperation, TokenOperationProps } from '@koiner/contracts/domain';
import { TokenOperationSchema } from './token-operation.schema';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { UUID } from '@appvise/domain';

export class TokenOperationSchemaFactory extends EntitySchemaFactory<
  TokenOperation,
  TokenOperationSchema
> {
  protected toDomainProps(
    entitySchema: TokenOperationSchema,
  ): EntityProps<TokenOperationProps> {
    const id = new UUID(entitySchema.id);

    const props: TokenOperationProps = {
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
    entity: TokenOperation,
  ): EntitySchemaProps<TokenOperationSchema> {
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
