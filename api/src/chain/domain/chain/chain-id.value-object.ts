import {
  ArgumentOutOfRangeException,
  DomainPrimitive,
  Guard,
  ID,
} from '@appvise/domain';

export class ChainId extends ID {
  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIs(value, 46)) {
      throw new ArgumentOutOfRangeException('id is out of range');
    }
  }
}
