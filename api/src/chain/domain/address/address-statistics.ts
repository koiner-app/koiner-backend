import {
  Statistics,
  StatisticsProps,
  UpdateStatisticsProps,
} from '@appvise/domain';

export interface AddressStatisticsProps extends StatisticsProps {
  contractCount: number;
  operationCount: number;
  transactionCount: number;
}

export interface UpdateAddressStatisticsProps extends UpdateStatisticsProps {
  contractCount?: number;
  operationCount?: number;
  transactionCount?: number;
}

export class AddressStatistics extends Statistics<
  AddressStatisticsProps,
  UpdateAddressStatisticsProps
> {
  static create(): AddressStatistics {
    return new AddressStatistics({
      contractCount: 0,
      operationCount: 0,
      transactionCount: 0,
    });
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
