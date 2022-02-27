import { ValueObject } from '../base-classes/value-object.base';
import {
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
} from '@appvise/domain/index';

export interface StatisticsProps {
  [index: symbol]: number;
}

export interface UpdateStatisticsProps {
  [index: symbol]: number | undefined;
}

export class Statistics<
  TStatisticsProps extends StatisticsProps,
  TUpdateStatisticsProps extends UpdateStatisticsProps,
> extends ValueObject<TStatisticsProps> {
  public update(props: TUpdateStatisticsProps): void {
    Object.entries(props).forEach(([key, value]) => {
      if (value < 1) {
        throw new ArgumentOutOfRangeException('Amount must be positive');
      }

      this.props[key] += value;
    });
  }

  protected validate(props: StatisticsProps): void {
    Object.entries(props).forEach(([key, value]) => {
      if (value < 0) {
        throw new ArgumentInvalidException(
          `Statistics for ${key} must be 0 or greater than 0`,
        );
      }
    });
  }
}
