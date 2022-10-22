import {
  ArgumentOutOfRangeException,
  Guard,
  ValueObject,
} from '@appvise/domain';

export interface BlockReceiptProps {
  diskStorageUsed: number;
  networkBandwidthUsed: number;
  computeBandwidthUsed: number;
  eventCount: number;
}

export class BlockReceipt extends ValueObject<BlockReceiptProps> {
  get diskStorageUsed(): number {
    return this.props.diskStorageUsed;
  }

  get networkBandwidthUsed(): number {
    return this.props.networkBandwidthUsed;
  }

  get computeBandwidthUsed(): number {
    return this.props.computeBandwidthUsed;
  }

  get eventCount(): number {
    return this.props.eventCount;
  }

  protected validate(props: BlockReceiptProps): void {
    if (!Guard.isGreatherThan(props.diskStorageUsed, -1)) {
      throw new ArgumentOutOfRangeException('diskStorageUsed is out of range');
    }

    if (!Guard.isGreatherThan(props.networkBandwidthUsed, -1)) {
      throw new ArgumentOutOfRangeException(
        'networkBandwidthUsed is out of range'
      );
    }

    if (!Guard.isGreatherThan(props.computeBandwidthUsed, -1)) {
      throw new ArgumentOutOfRangeException(
        'computeBandwidthUsed is out of range'
      );
    }

    if (!Guard.isGreatherThan(props.eventCount, -1)) {
      throw new ArgumentOutOfRangeException('eventCount is out of range');
    }
  }
}
