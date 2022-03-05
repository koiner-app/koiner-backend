import { SelectionSet } from '@appvise/domain';

export class AddressQuery {
  constructor(
    public readonly addressId: string,
    public readonly selectionSet?: SelectionSet,
  ) {}
}
