import {
  ArgumentOutOfRangeException,
  DomainPrimitive,
  Guard,
  ID,
} from '@appvise/domain';

export class KoinosAddressId extends ID {
  protected validate({ value }: DomainPrimitive<string>): void {
    // if (!Guard.lengthIsBetween(value, 5, 35)) {
    //   throw new ArgumentOutOfRangeException('address id is out of range');
    // }
  }
}
