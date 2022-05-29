import {
  Statistics,
  StatisticsProps,
  UpdateStatisticsProps,
} from '@appvise/domain';

export interface TokenContractStatisticsProps extends StatisticsProps {
  holderCount: number;
  operationCount: number;
  mintCount: number;
  transferCount: number;
}

export interface UpdateTokenContractStatisticsProps
  extends UpdateStatisticsProps {
  holderCount?: number;
  operationCount?: number;
  mintCount?: number;
  transferCount?: number;
}

export class TokenContractStatistics extends Statistics<
  TokenContractStatisticsProps,
  UpdateTokenContractStatisticsProps
> {
  static create(): TokenContractStatistics {
    return new TokenContractStatistics({
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
