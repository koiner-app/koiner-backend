import {
  AggregateRoot,
  ArgumentOutOfRangeException,
  Guard,
} from '@appvise/domain';
import { TransactionCreated } from '@koiner/chain/domain';
import { TransactionProps, CreateTransactionProps } from './transaction.types';
import { KoinosId } from '@koiner/domain';
import { TransactionHeader } from '@koiner/chain/domain';

export class Transaction extends AggregateRoot<TransactionProps> {
  protected readonly _id: KoinosId;

  static create(create: CreateTransactionProps, id: KoinosId): Transaction {
    const props: TransactionProps = {
      ...create,
    };

    const transaction = new Transaction({ id, props });

    transaction.apply(new TransactionCreated(id.value, props.header.signer));

    return transaction;
  }

  get blockHeight(): number {
    return this.props.blockHeight;
  }

  get header(): TransactionHeader {
    return this.props.header;
  }

  get signature(): string {
    return this.props.signature;
  }

  get operationCount(): number {
    return this.props.operationCount;
  }

  get index(): number {
    return this.props.transactionIndex;
  }

  validate(): void {
    // TODO: Add validations

    if (!Guard.lengthIsBetween(this.props.signature, 1, 136)) {
      throw new ArgumentOutOfRangeException('signature is out of range');
    }
  }
}
