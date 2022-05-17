import { BlockHeader, BlockReceipt } from '.';

export interface CreateBlockProps {
  header: BlockHeader;
  signature: string;
  transactionCount: number;
  receipt: BlockReceipt;
}

export type BlockProps = CreateBlockProps;
