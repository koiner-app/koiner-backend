import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { ChainId } from '@koiner/domain';
import { StopSignal, StopSignalProps } from '@koiner/sync/domain';
import { StopSignalSchema } from '.';

export class StopSignalSchemaFactory extends EntitySchemaFactory<
  StopSignal,
  StopSignalSchema
> {
  protected toDomainProps(
    entitySchema: StopSignalSchema
  ): EntityProps<StopSignalProps> {
    const id = new ChainId(entitySchema.id);

    const props: StopSignalProps = {
      stopAtHeight: entitySchema.stop_at_height,
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: StopSignal
  ): EntitySchemaProps<StopSignalSchema> {
    const props = entity.getPropsCopy();

    return {
      stop_at_height: props.stopAtHeight,
    };
  }
}
