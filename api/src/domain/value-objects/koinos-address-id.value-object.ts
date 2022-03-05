import {
  ArgumentOutOfRangeException,
  DomainPrimitive,
  Guard,
  ID,
} from '@appvise/domain';

export class KoinosAddressId extends ID {
  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIs(value, 34)) {
      throw new ArgumentOutOfRangeException('address id is out of range');
    }
  }
}
