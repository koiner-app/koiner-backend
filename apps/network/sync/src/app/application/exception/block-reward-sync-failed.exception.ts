import { ExceptionBase } from '@appvise/domain';
import { ExceptionCodes } from './exception.codes';

export class BlockRewardSyncFailedException extends ExceptionBase {
  code = ExceptionCodes.blockRewardSyncFailed;

  constructor(
    public readonly height: number,
    readonly message: string,
    readonly metadata?: unknown
  ) {
    super(message, metadata);
    this.height = height;
  }
}
