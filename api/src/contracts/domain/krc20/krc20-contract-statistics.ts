import {
  Statistics,
  StatisticsProps,
  UpdateStatisticsProps,
} from '@appvise/domain';

export interface Krc20ContractStatisticsProps extends StatisticsProps {
  holderCount: number;
  operationCount: number;
  mintCount: number;
  transferCount: number;
}

export interface UpdateKrc20ContractStatisticsProps
  extends UpdateStatisticsProps {
  holderCount?: number;
  operationCount?: number;
  mintCount?: number;
  transferCount?: number;
}

export class Krc20ContractStatistics extends Statistics<
  Krc20ContractStatisticsProps,
  UpdateKrc20ContractStatisticsProps
> {
  static create(): Krc20ContractStatistics {
    return new Krc20ContractStatistics({
      holderCount: 0,
      operationCount: 0,
      mintCount: 0,
      transferCount: 0,
    });
  }

  get holderCount(): number {
    return this.props.holderCount;
  }

  get operationCount(): number {
    return this.props.operationCount;
  }

  get mintCount(): number {
    return this.props.mintCount;
  }

  get transferCount(): number {
    return this.props.transferCount;
  }
}
