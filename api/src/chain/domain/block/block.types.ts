import { BlockHeader } from '@koiner/chain/domain';

export interface CreateBlockProps {
  header: BlockHeader;
  signature: string;
  transactionCount: number;
}

export type BlockProps = CreateBlockProps;
