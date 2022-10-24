import { ValueObject } from '@appvise/domain';

export interface ChainStatsProps {
  addressCount: number;
  operationCount: number;
  transactionCount: number;
}

export interface UpdateStatsProps {
  addressCount?: number;
  operationCount?: number;
  transactionCount?: number;
}

export class ChainStats extends ValueObject<ChainStatsProps> {
  get addressCount(): number {
    return this.props.addressCount;
  }

  get operationCount(): number {
    return this.props.operationCount;
  }

  get transactionCount(): number {
    return this.props.transactionCount;
  }

  update(stats: UpdateStatsProps): void {
    if (stats.addressCount) {
      this.props.addressCount += stats.addressCount;
    }

    if (stats.operationCount) {
      this.props.operationCount += stats.operationCount;
    }

    if (stats.transactionCount) {
      this.props.transactionCount += stats.transactionCount;
    }
  }

  protected validate(): void {
    //
  }
}
