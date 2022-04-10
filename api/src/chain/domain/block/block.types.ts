import { KoinosAddressId } from '@koiner/domain';
import { BlockHeader, BlockReceipt } from '.';

export interface CreateBlockProps {
  header: BlockHeader;
  signature: string;
  transactionCount: number;
  receipt: BlockReceipt;
  producerId: KoinosAddressId;
  producerRewards: number;
}

export type BlockProps = CreateBlockProps;
