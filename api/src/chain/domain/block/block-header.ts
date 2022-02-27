import {
  ArgumentOutOfRangeException,
  Guard,
  ValueObject,
} from '@appvise/domain';

export interface BlockHeaderProps {
  previous: string;
  height: number;
  timestamp: number;
  previousStateMerkleRoot?: string;
  transactionMerkleRoot?: string;
  signer: string;
}

export class BlockHeader extends ValueObject<BlockHeaderProps> {
  get height(): number {
    return this.props.height;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  get previous(): string {
    return this.props.previous;
  }

  get previousStateMerkleRoot(): string | undefined {
    return this.props.previousStateMerkleRoot;
  }

  get transactionMerkleRoot(): string | undefined {
    return this.props.transactionMerkleRoot;
  }

  get signer(): string {
    return this.props.signer;
  }

  protected validate(props: BlockHeaderProps): void {
    if (!Guard.lengthIs(props.previous, 70)) {
      throw new ArgumentOutOfRangeException('previous is out of range');
    }

    if (
      props.previousStateMerkleRoot &&
      !Guard.lengthIs(props.previousStateMerkleRoot, 48)
    ) {
      throw new ArgumentOutOfRangeException(
        'previousStateMerkleRoot is out of range',
      );
    }

    if (
      props.transactionMerkleRoot &&
      !Guard.lengthIs(props.transactionMerkleRoot, 48)
    ) {
      throw new ArgumentOutOfRangeException(
        'transactionMerkleRoot is out of range',
      );
    }

    if (!Guard.lengthIs(props.signer, 34)) {
      throw new ArgumentOutOfRangeException('signer is out of range');
    }
  }
}
