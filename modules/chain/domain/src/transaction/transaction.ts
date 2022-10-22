import { AggregateRoot } from '@appvise/domain';
import { KoinosId } from '@koiner/domain';
import { Operation } from '../operation';
import {
  CreateTransactionProps,
  TransactionCreated,
  TransactionHeader,
  TransactionProps,
  TransactionReceipt,
} from '.';

export class Transaction extends AggregateRoot<TransactionProps> {
  protected readonly _id!: KoinosId;

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
        timestamp: props.timestamp,
      })
    );

    return transaction;
  }

  get blockHeight(): number {
    return this.props.blockHeight;
  }

  get operations(): Operation[] {
    return this.props.operations;
  }

  get operationCount(): number {
    return this.props.operationCount;
  }

  get signatures(): string[] {
    return this.props.signatures;
  }

  get index(): number {
    return this.props.transactionIndex;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  get header(): TransactionHeader {
    return this.props.header;
  }

  get receipt(): TransactionReceipt {
    return this.props.receipt;
  }

  validate(): void {
    // TODO: Add validations
  }
}
