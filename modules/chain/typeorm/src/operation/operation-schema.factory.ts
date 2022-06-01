import { UUID } from '@appvise/domain';
import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { KoinosId } from '@koiner/domain';
import { Operation, OperationProps } from '@koiner/chain/domain';
import { OperationSchema } from '.';

export class OperationSchemaFactory extends EntitySchemaFactory<
  Operation,
  OperationSchema
> {
  protected toDomainProps(
    entitySchema: OperationSchema
  ): EntityProps<OperationProps> {
    const id = new UUID(entitySchema.id);

    const props: OperationProps = {
      blockHeight: entitySchema.block_height,
      transactionId: new KoinosId(entitySchema.transaction_id),
      operationIndex: entitySchema.operation_index,
      type: entitySchema.type,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: Operation
  ): EntitySchemaProps<OperationSchema> {
    const props = entity.getPropsCopy();

    return {
      block_height: props.blockHeight,
      transaction_id: props.transactionId.value,
      // TODO: How to handle this?
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      transaction: null,
      operation_index: props.operationIndex,
      type: props.type,
    };
  }
}
