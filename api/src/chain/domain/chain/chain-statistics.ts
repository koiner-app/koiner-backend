import {
  Statistics,
  StatisticsProps,
  UpdateStatisticsProps,
} from '@appvise/domain';

export interface ChainStatisticsProps extends StatisticsProps {
  addressCount: number;
  contractCount: number;
  operationCount: number;
  transactionCount: number;
}

export interface UpdateChainStatisticsProps extends UpdateStatisticsProps {
  addressCount?: number;
  contractCount?: number;
  operationCount?: number;
  transactionCount?: number;
}

export class ChainStatistics extends Statistics<
  ChainStatisticsProps,
  UpdateChainStatisticsProps
> {
  static create(): ChainStatistics {
    return new ChainStatistics({
      addressCount: 0,
      contractCount: 0,
      operationCount: 0,
      transactionCount: 0,
    });
  }

  get addressCount(): number {
    return this.props.addressCount;
  }

  get contractCount(): number {
    return this.props.contractCount;
  }

  get operationCount(): number {
    return this.props.operationCount;
  }

  get transactionCount(): number {
    return this.props.transactionCount;
  }
}
