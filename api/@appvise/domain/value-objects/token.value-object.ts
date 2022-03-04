import { DateVO, DomainPrimitive } from '@appvise/domain';
import { v4 as uuidV4 } from 'uuid';
// Must use full import to prevent TypeError: Class extends value undefined is not a constructor or null
import { ValueObject } from '@appvise/domain/base-classes/value-object.base';

export interface TokenProps {
  value: string;
  createdAt: DateVO;
  expiresAt?: DateVO;
}

export class Token extends ValueObject<TokenProps> {
  public get value(): string {
    return this.props.value;
  }

  public get createdAt(): DateVO {
    return this.props.createdAt;
  }

  public get expiresAt(): DateVO | undefined {
    return this.props.expiresAt;
  }

  public get expirable(): boolean {
    return this.expiresAt !== undefined;
  }

  public get expiresIn(): number | undefined {
    if (!this.expirable) {
      return undefined;
    }

    return Math.round(
      (this.props.expiresAt.value.getTime() - Date.now()) / 1000,
    );
  }

  public get hasExpired(): boolean {
    return this.expirable && this.expiresIn < 0;
  }

  /**
   * Returns new Token instance with randomly generated Token value
   * @static
   * @param expiresIn Amount in seconds the token expires in from now. Skip to have indefinite valid tokens
   * @return {*}  {Token}
   */
  static generate(expiresIn?: number): Token {
    let expiresAt: DateVO | undefined;

    if (expiresIn) {
      expiresAt = DateVO.now().add(0, 0, expiresIn);
    }

    return new Token({
      value: uuidV4(),
      createdAt: DateVO.now(),
      expiresAt,
    });
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    // TODO: Add different versions for UUID and other token formats?
    // if (!validate(value)) {
    //   throw new ArgumentInvalidException('Incorrect UUID format');
    // }
  }
}
