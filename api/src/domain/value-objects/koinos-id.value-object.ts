import {
  ArgumentOutOfRangeException,
  DomainPrimitive,
  Guard,
  ID,
} from '@appvise/domain';

export class KoinosId extends ID {
  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIs(value, 70)) {
      throw new ArgumentOutOfRangeException('id is out of range');
    }
  }
}
