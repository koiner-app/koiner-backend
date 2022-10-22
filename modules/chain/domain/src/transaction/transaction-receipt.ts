import {
  ArgumentOutOfRangeException,
  Guard,
  ValueObject,
} from '@appvise/domain';

export interface TransactionReceiptProps {
  payer: string;
  maxPayerRc: number;
  rcLimit: number;
  rcUsed: number;
  diskStorageUsed: number;
  networkBandwidthUsed: number;
  computeBandwidthUsed: number;
  eventCount: number;
  reverted: boolean;
}

export class TransactionReceipt extends ValueObject<TransactionReceiptProps> {
  get payer(): string {
    return this.props.payer;
  }

  get maxPayerRc(): number {
    return this.props.maxPayerRc;
  }

  get rcLimit(): number {
    return this.props.rcLimit;
  }

  get rcUsed(): number {
    return this.props.rcUsed;
  }

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

  get reverted(): boolean {
    return this.props.reverted;
  }

  protected validate(props: TransactionReceiptProps): void {
    if (!Guard.isGreatherThan(props.maxPayerRc, -1)) {
      throw new ArgumentOutOfRangeException('maxPayerRc is out of range');
    }

    if (!Guard.isGreatherThan(props.rcLimit, -1)) {
      throw new ArgumentOutOfRangeException('rcLimit is out of range');
    }

    if (!Guard.isGreatherThan(props.rcUsed, -1)) {
      throw new ArgumentOutOfRangeException('rcUsed is out of range');
    }

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
