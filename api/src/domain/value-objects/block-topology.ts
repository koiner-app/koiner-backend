import {
  ArgumentOutOfRangeException,
  Guard,
  ValueObject,
} from '@appvise/domain';
import { KoinosId } from '@koiner/domain';

export interface ChainHeaderProps {
  id: KoinosId;
  height: number;
  previous: string;
}

export class BlockTopology extends ValueObject<ChainHeaderProps> {
  get id(): KoinosId {
    return this.props.id;
  }

  get height(): number {
    return this.props.height;
  }

  get previous(): string {
    return this.props.previous;
  }

  protected validate(props: ChainHeaderProps): void {
    if (!Guard.lengthIs(props.previous, 70)) {
      throw new ArgumentOutOfRangeException('previous is out of range');
    }
  }
}
