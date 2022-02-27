import {
  ArgumentOutOfRangeException,
  Guard,
  ValueObject,
} from '@appvise/domain';

export interface TransactionHeaderProps {
  rcLimit: string;
  nonce?: string;
  operationMerkleRoot?: string;
  signer: string;
}

export class TransactionHeader extends ValueObject<TransactionHeaderProps> {
  get rcLimit(): string {
    return this.props.rcLimit;
  }

  get nonce(): string | undefined {
    return this.props.nonce;
  }

  get operationMerkleRoot(): string | undefined {
    return this.props.operationMerkleRoot;
  }

  get signer(): string {
    return this.props.signer;
  }

  protected validate(props: TransactionHeaderProps): void {
    if (!Guard.lengthIsBetween(props.rcLimit, 1, 20)) {
      throw new ArgumentOutOfRangeException('rcLimit is out of range');
    }

    if (props.nonce && !Guard.lengthIsBetween(props.nonce, 1, 20)) {
      throw new ArgumentOutOfRangeException('nonce is out of range');
    }

    if (
      props.operationMerkleRoot &&
      !Guard.lengthIs(props.operationMerkleRoot, 48)
    ) {
      throw new ArgumentOutOfRangeException(
        'previousStateMerkleRoot is out of range',
      );
    }

    if (!Guard.lengthIsBetween(props.signer, 20, 34)) {
      throw new ArgumentOutOfRangeException('signer is out of range');
    }
  }
}
