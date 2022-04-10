import {
  Statistics,
  StatisticsProps,
  UpdateStatisticsProps,
} from '@appvise/domain';

export interface AddressStatisticsProps extends StatisticsProps {
  blockCount: number;
  operationCount: number;
  transactionCount: number;
}

export interface UpdateAddressStatisticsProps extends UpdateStatisticsProps {
  blockCount?: number;
  operationCount?: number;
  transactionCount?: number;
}

export class AddressStatistics extends Statistics<
  AddressStatisticsProps,
  UpdateAddressStatisticsProps
> {
  static create(blockCount = 0): AddressStatistics {
    return new AddressStatistics({
      blockCount: blockCount,
      operationCount: 0,
      transactionCount: 0,
    });
  }

  get blockCount(): number {
    return this.props.blockCount;
  }

  get operationCount(): number {
    return this.props.operationCount;
  }

  get transactionCount(): number {
    return this.props.transactionCount;
  }
}
