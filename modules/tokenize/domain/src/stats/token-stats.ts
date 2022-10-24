import { AggregateRoot } from '@appvise/domain';
import { ChainId } from '@koiner/domain';
import {
  TokenStatsProps,
  TokenStatsUpdated,
  CreateTokenStatsProps,
  UpdateTokenStatsProps,
} from '.';

export class TokenStats extends AggregateRoot<TokenStatsProps> {
  protected readonly _id!: ChainId;

  static create(create: CreateTokenStatsProps, id: ChainId): TokenStats {
    const props: TokenStatsProps = {
      ...create,
      operationCount: 0,
      burnCount: 0,
      mintCount: 0,
      transferCount: 0,
    };

    const tokenStats = new TokenStats({ id, props });

    tokenStats.addEvent(
      new TokenStatsUpdated({
        aggregateId: id.value,
        contractCount: props.contractCount,
        burnCount: props.burnCount,
        mintCount: props.mintCount,
        transferCount: props.transferCount,
      })
    );

    return tokenStats;
  }

  get contractCount(): number {
    return this.props.contractCount;
  }

  get burnCount(): number {
    return this.props.burnCount;
  }

  get mintCount(): number {
    return this.props.mintCount;
  }

  get transferCount(): number {
    return this.props.transferCount;
  }

  update(props: UpdateTokenStatsProps): void {
    if (props.contractCount) {
      this.props.contractCount += props.contractCount;
    }

    if (props.burnCount) {
      this.props.burnCount += props.burnCount;
    }

    if (props.mintCount) {
      this.props.mintCount += props.mintCount;
    }

    if (props.transferCount) {
      this.props.transferCount += props.transferCount;
    }

    this.addEvent(
      new TokenStatsUpdated({
        aggregateId: this.id.value,
        contractCount: this.props.contractCount,
        burnCount: this.props.burnCount,
        mintCount: this.props.mintCount,
        transferCount: this.props.transferCount,
      })
    );
  }

  undo(props: UpdateTokenStatsProps): void {
    if (props.contractCount !== undefined) {
      this.props.contractCount -= props.contractCount;
    }

    if (props.burnCount !== undefined) {
      this.props.burnCount -= props.burnCount;
    }

    if (props.mintCount !== undefined) {
      this.props.mintCount -= props.mintCount;
    }

    if (props.transferCount !== undefined) {
      this.props.transferCount -= props.transferCount;
    }
  }

  validate(): void {
    //
  }
}
