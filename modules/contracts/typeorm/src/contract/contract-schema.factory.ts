import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosAddressId } from '@koiner/domain';
import {
  Contract,
  ContractProps,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { ContractSchema } from '.';

export class ContractSchemaFactory extends EntitySchemaFactory<
  Contract,
  ContractSchema
> {
  protected toDomainProps(
    entitySchema: ContractSchema
  ): EntityProps<ContractProps> {
    const id = new KoinosAddressId(entitySchema.id);

    const props: ContractProps = {
      bytecode: entitySchema.bytecode,
      abi: entitySchema.abi,
      contractStandardType: entitySchema.contract_standard_type,
      timestamp: entitySchema.timestamp,
    };

    return { id, props };
  }

  protected toSchemaProps(entity: Contract): EntitySchemaProps<ContractSchema> {
    const props = entity.getPropsCopy();

    return {
      bytecode: props.bytecode,
      abi: props.abi,
      contract_standard_type:
        props.contractStandardType as ContractStandardType,
      timestamp: props.timestamp,
    };
  }
}
