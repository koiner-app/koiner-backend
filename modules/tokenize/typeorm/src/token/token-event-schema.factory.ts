import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { TokenEvent, TokenEventProps } from '@koiner/tokenize/domain';
import { TokenEventSchema } from '.';

export class TokenEventSchemaFactory extends EntitySchemaFactory<
  TokenEvent,
  TokenEventSchema
> {
  protected toDomainProps(
    entitySchema: TokenEventSchema
  ): EntityProps<TokenEventProps> {
    const id = new UUID(entitySchema.id);

    const props: TokenEventProps = {
      blockHeight: entitySchema.block_height,
      parentId: new KoinosId(entitySchema.parent_id),
      parentType: entitySchema.parent_type,
      sequence: entitySchema.sequence,
      contractId: new KoinosAddressId(entitySchema.contract_id),
      name: entitySchema.name,
      from: entitySchema.from
        ? new KoinosAddressId(entitySchema.from)
        : undefined,
      to: entitySchema.to ? new KoinosAddressId(entitySchema.to) : undefined,
      value: parseInt(entitySchema.value),
      timestamp: entitySchema.timestamp,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: TokenEvent
  ): EntitySchemaProps<TokenEventSchema> {
    const props = entity.getPropsCopy();

    return {
      block_height: props.blockHeight,
      parent_id: props.parentId.value,
      parent_type: props.parentType,
      sequence: props.sequence,
      contract_id: props.contractId.value,
      name: props.name,
      from: props.from ? props.from.value : undefined,
      to: props.to ? props.to.value : undefined,
      value: String(props.value).padStart(20, '0'),
      timestamp: props.timestamp,
    };
  }
}
