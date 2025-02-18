import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { ContractEvent, ContractEventProps } from '@koiner/contracts/domain';
import { ContractEventSchema } from '.';

export class ContractEventSchemaFactory extends EntitySchemaFactory<
  ContractEvent,
  ContractEventSchema
> {
  protected toDomainProps(
    entitySchema: ContractEventSchema
  ): EntityProps<ContractEventProps> {
    const id = new UUID(entitySchema.id);

    const props: ContractEventProps = {
      blockHeight: entitySchema.block_height,
      parentId: new KoinosId(entitySchema.parent_id),
      parentType: entitySchema.parent_type,
      sequence: entitySchema.sequence,
      contractId: new KoinosAddressId(entitySchema.contract_id),
      contractStandardType: entitySchema.contract_standard_type,
      name: entitySchema.name,
      data: entitySchema.data
        ? (entitySchema.data as unknown as Uint8Array).toString()
        : undefined,
      decodedData:
        typeof entitySchema.decoded_data === 'object'
          ? (JSON.stringify(entitySchema.decoded_data) as any)
          : entitySchema.decoded_data,
      impacted: entitySchema.impacted
        ? entitySchema.impacted.map((impacted) => new KoinosAddressId(impacted))
        : undefined,
      timestamp: entitySchema.timestamp,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: ContractEvent
  ): EntitySchemaProps<ContractEventSchema> {
    const props = entity.getPropsCopy();

    return {
      block_height: props.blockHeight,
      parent_id: props.parentId.value,
      parent_type: props.parentType,
      sequence: props.sequence,
      contract_id: props.contractId.value,
      contract_standard_type: props.contractStandardType,
      name: props.name,
      data: props.data,
      decoded_data:
        typeof props.decodedData === 'string'
          ? JSON.parse(props.decodedData as unknown as string)
          : props.decodedData,
      impacted: props.impacted
        ? props.impacted.map((impacted) => impacted.value)
        : undefined,
      timestamp: props.timestamp,
    };
  }
}
