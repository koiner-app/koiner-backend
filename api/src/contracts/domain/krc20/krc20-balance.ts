import { AggregateRoot, ConflictException, UUID } from '@appvise/domain';
import {
  CreateKrc20BalanceProps,
  Krc20BalanceCreated,
  Krc20BalanceProps,
  Krc20BalanceUpdated,
  TokensOrigin,
  UpdateKrc20BalanceProps,
} from '.';
import { KoinosAddressId } from '@koiner/domain';
import { BlockRewardsReceived } from '@koiner/contracts/domain/krc20/event/block-rewards-received';

export class Krc20Balance extends AggregateRoot<Krc20BalanceProps> {
  protected readonly _id: KoinosAddressId;

  static create(
    create: CreateKrc20BalanceProps,
    tokensOrigin: TokensOrigin,
    id: UUID,
  ): Krc20Balance {
    const props: Krc20BalanceProps = {
      ...create,
    };

    const tokenBalance = new Krc20Balance({ id, props });

    tokenBalance.addEvent(
      new Krc20BalanceCreated({
        aggregateId: id.value,
        addressId: props.addressId.value,
        contractId: props.contractId.value,
        balance: props.balance,
        tokensOrigin: tokensOrigin,
      }),
    );

    return tokenBalance;
  }

  get addressId(): KoinosAddressId {
    return this.props.addressId;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get balance(): number {
    return this.props.balance;
  }

  get rewardsReceived(): number {
    return this.props.rewardsReceived;
  }

  update(props: UpdateKrc20BalanceProps): number {
    this.props.balance += props.amountChanged;

    if (this.props.balance < 0) {
      // TODO: Add custom exception
      throw new ConflictException('Balance cannot be lower than 0');
    }

    this.addEvent(
      new Krc20BalanceUpdated({
        aggregateId: this.id.value,
        addressId: this.addressId.value,
        contractId: this.contractId.value,
        balance: this.balance,
        amountChanged: props.amountChanged,
        tokensOrigin: props.tokensOrigin,
      }),
    );

    if (props.tokensOrigin === TokensOrigin.blockReward) {
      this.addRewards(props.amountChanged);
    }

    return this.balance;
  }

  addRewards(rewards: number): void {
    this.props.rewardsReceived += rewards;

    this.addEvent(
      new BlockRewardsReceived({
        aggregateId: this.id.value,
        rewardsReceived: rewards,
        totalRewardsReceived: this.props.rewardsReceived,
      }),
    );
  }

  validate(): void {
    //
  }
}
