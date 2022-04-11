import { AggregateRoot, UUID } from '@appvise/domain';
import {
  CreateKrc20OperationProps,
  Krc20OperationProps,
} from './krc20-operation.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';

export class Krc20Operation extends AggregateRoot<Krc20OperationProps> {
  protected readonly _id: KoinosId;

  static create(create: CreateKrc20OperationProps, id: UUID): Krc20Operation {
    const props: Krc20OperationProps = {
      ...create,
    };

    // operation.apply(new Krc20OperationCreated(id.value, props.header.signer));

    return new Krc20Operation({ id, props });
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get name(): string {
    return this.props.name;
  }

  get from(): KoinosAddressId | undefined {
    return this.props.from;
  }

  get to(): KoinosAddressId {
    return this.props.to;
  }

  get value(): number {
    return this.props.value;
  }

  validate(): void {
    // TODO: Add validations
  }
}
