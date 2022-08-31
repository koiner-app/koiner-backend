import { AggregateRoot, UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  CreateTokenEventProps,
  TokenEventCreated,
  TokenEventProps,
  TokensBurned,
  TokensMinted,
  TokensTransferred,
} from '.';

export class TokenEvent extends AggregateRoot<TokenEventProps> {
  protected readonly _id!: KoinosId;

  static create(create: CreateTokenEventProps, id?: UUID): TokenEvent {
    const props: TokenEventProps = {
      ...create,
    };

    id = id ?? UUID.generate();
    const event = new TokenEvent({ id, props });

    event.addEvent(
      new TokenEventCreated({
        aggregateId: id.value,
        contractId: props.contractId.value,
        name: props.name,
        from: props.from ? props.from.value : undefined,
        to: props.to ? props.to.value : undefined,
        value: props.value,
        timestamp: props.timestamp,
      })
    );

    if (event.name === 'burn' && props.from) {
      event.addEvent(
        new TokensBurned({
          aggregateId: id.value,
          contractId: props.contractId.value,
          from: props.from.value,
          value: props.value,
          timestamp: props.timestamp,
        })
      );
    }

    if (event.name === 'mint' && props.to) {
      event.addEvent(
        new TokensMinted({
          aggregateId: id.value,
          contractId: props.contractId.value,
          to: props.to.value,
          value: props.value,
          timestamp: props.timestamp,
        })
      );
    }

    if (event.name === 'transfer' && props.from && props.to) {
      event.addEvent(
        new TokensTransferred({
          aggregateId: id.value,
          contractId: props.contractId.value,
          from: props.from.value,
          to: props.to.value,
          value: props.value,
          timestamp: props.timestamp,
        })
      );
    }

    return event;
  }

  get contractId(): KoinosAddressId | undefined {
    return this.props.contractId;
  }

  get name(): string {
    return this.props.name;
  }

  get from(): KoinosAddressId | undefined {
    return this.props.from;
  }

  get to(): KoinosAddressId | undefined {
    return this.props.to;
  }

  get value(): number {
    return this.props.value;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  validate(): void {
    //
  }
}
