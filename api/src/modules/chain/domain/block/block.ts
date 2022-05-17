import {
  AggregateRoot,
  ArgumentOutOfRangeException,
  Guard,
} from '@appvise/domain';
import { KoinosId } from '@koiner/domain';
import {
  AfterBlockCreated,
  BlockCreated,
  BlockHeader,
  BlockProps,
  BlockReceipt,
  BlockWithTransactionsCreated,
  CreateBlockProps,
} from '.';

export class Block extends AggregateRoot<BlockProps> {
  protected readonly _id: KoinosId;

  static create(create: CreateBlockProps, id: KoinosId): Block {
    const props: BlockProps = {
      ...create,
    };

    const block = new Block({ id, props });

    block.addEvent(
      new BlockCreated({
        aggregateId: id.value,
        height: props.header.height,
        timestamp: props.header.timestamp,
        transactionCount: props.transactionCount,
      }),
    );

    if (props.transactionCount) {
      block.addEvent(
        new BlockWithTransactionsCreated({
          aggregateId: id.value,
          height: props.header.height,
          timestamp: props.header.timestamp,
          transactionCount: props.transactionCount,
        }),
      );
    }

    // Fire event after BlockCreated event has been handled
    block.addEvent(
      new AfterBlockCreated({
        aggregateId: id.value,
        height: props.header.height,
        timestamp: props.header.timestamp,
        transactionCount: props.transactionCount,
      }),
    );

    return block;
  }

  get header(): BlockHeader {
    return this.props.header;
  }

  get signature(): string {
    return this.props.signature;
  }

  get transactionCount(): number {
    return this.props.transactionCount;
  }

  get receipt(): BlockReceipt {
    return this.props.receipt;
  }

  validate(): void {
    if (!Guard.lengthIsBetween(this.props.signature, 80, 136)) {
      throw new ArgumentOutOfRangeException('signature is out of range');
    }
  }
}
