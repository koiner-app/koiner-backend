import { AggregateRoot } from '@appvise/domain';
import { Krc20ContractCreated } from '@koiner/contracts/domain';
import {
  Krc20ContractProps,
  CreateKrc20ContractProps,
} from './krc20-contract.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';

export class Krc20Contract extends AggregateRoot<Krc20ContractProps> {
  protected readonly _id: KoinosId;

  static create(
    create: CreateKrc20ContractProps,
    id: KoinosAddressId,
  ): Krc20Contract {
    const props: Krc20ContractProps = {
      ...create,
    };

    const contract = new Krc20Contract({ id, props });

    contract.apply(new Krc20ContractCreated(id.value));

    return contract;
  }

  get blockHeight(): number {
    return this.props.blockHeight;
  }

  get transactionId(): KoinosId {
    return this.props.transactionId;
  }

  get operationIndex(): number {
    return this.props.operationIndex;
  }

  get name(): string {
    return this.props.name;
  }

  get symbol(): string {
    return this.props.symbol;
  }

  get decimals(): number {
    return this.props.decimals;
  }

  validate(): void {
    // TODO: Add validations
  }
}
