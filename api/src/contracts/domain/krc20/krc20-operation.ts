import { AggregateRoot, UUID } from '@appvise/domain';
import {
  Krc20OperationProps,
  CreateKrc20OperationProps,
} from './krc20-operation.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';

export class Krc20Operation extends AggregateRoot<Krc20OperationProps> {
  protected readonly _id: KoinosId;

  static create(create: CreateKrc20OperationProps, id: UUID): Krc20Operation {
    const props: Krc20OperationProps = {
      ...create,
    };

    const operation = new Krc20Operation({ id, props });

    // operation.apply(new Krc20OperationCreated(id.value, props.header.signer));

    return operation;
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

  get value(): string {
    return this.props.value;
  }

  validate(): void {
    // TODO: Add validations
  }
}
