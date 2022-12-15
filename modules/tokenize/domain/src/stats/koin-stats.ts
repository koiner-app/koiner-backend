import { AggregateRoot } from '@appvise/domain';
import { ChainId } from '@koiner/domain';
import {
  KoinStatsProps,
  KoinStatsUpdated,
  CreateKoinStatsProps,
  UpdateKoinStatsProps,
} from '.';

export class KoinStats extends AggregateRoot<KoinStatsProps> {
  protected readonly _id!: ChainId;

  static create(create: CreateKoinStatsProps, id: ChainId): KoinStats {
    const props: KoinStatsProps = {
      ...create,
      timestamp: Date.now(),
    };

    const koinStats = new KoinStats({ id, props });

    koinStats.addEvent(
      new KoinStatsUpdated({
        aggregateId: id.value,
        price: props.price,
        timestamp: props.timestamp,
        bidPrice: props.bidPrice,
        bidQuantity: props.bidQuantity,
        askPrice: props.askPrice,
        askQuantity: props.askQuantity,
      })
    );

    return koinStats;
  }

  get price(): number {
    return this.props.price;
  }

  get bidPrice(): number {
    return this.props.bidPrice;
  }

  get bidQuantity(): number {
    return this.props.bidQuantity;
  }

  get askPrice(): number {
    return this.props.askPrice;
  }

  get askQuantity(): number {
    return this.props.askQuantity;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  update(props: UpdateKoinStatsProps): void {
    this.props.price = props.price;
    this.props.bidPrice = props.bidPrice;
    this.props.bidQuantity = props.bidQuantity;
    this.props.askPrice = props.askPrice;
    this.props.askQuantity = props.askQuantity;

    this.props.timestamp = Date.now();

    this.addEvent(
      new KoinStatsUpdated({
        aggregateId: this.id.value,
        price: this.price,
        timestamp: this.timestamp,
        bidPrice: this.bidPrice,
        bidQuantity: this.bidQuantity,
        askPrice: this.askPrice,
        askQuantity: this.askQuantity,
      })
    );
  }

  validate(): void {
    //
  }
}
