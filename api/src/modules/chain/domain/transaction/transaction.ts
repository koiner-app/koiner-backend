import {
  AggregateRoot,
  ArgumentOutOfRangeException,
  Guard,
} from '@appvise/domain';
import { Operation, TransactionCreated } from '@koiner/chain/domain';
import { TransactionProps, CreateTransactionProps } from './transaction.types';
import { KoinosId } from '@koiner/domain';
import { TransactionHeader } from '@koiner/chain/domain';

export class Transaction extends AggregateRoot<TransactionProps> {
  protected readonly _id: KoinosId;

  static create(create: CreateTransactionProps, id: KoinosId): Transaction {
    const props: TransactionProps = {
      ...create,
      operations: [],
    };

    const transaction = new Transaction({ id, props });

    transaction.addEvent(
      new TransactionCreated({
        aggregateId: id.value,
        blockHeight: props.blockHeight,
        payer: props.header.payer,
        operationCount: props.operationCount,
      }),
    );

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

  get operations(): Operation[] {
    return this.props.operations;
  }

  get operationCount(): number {
    return this.props.operationCount;
  }

  get index(): number {
    return this.props.transactionIndex;
  }

  validate(): void {
    // TODO: Add validations

    // TODO: What should be max length of signature?
    if (!Guard.lengthIsBetween(this.props.signature, 1, 255)) {
      throw new ArgumentOutOfRangeException('signature is out of range');
    }
  }
}
