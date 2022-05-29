import { ContractStandardType } from '.';

export class ContractStandard {
  constructor(
    private readonly _type: ContractStandardType,
    private readonly _name: string,
    private readonly _abi: any,
    private readonly _getters: string[]
  ) {}

  get type(): ContractStandardType {
    return this._type;
  }

  get name(): string {
    return this._name;
  }

  get abi(): any {
    return this._abi;
  }

  /**
   * List of abi getter names of the Contract Standard
   */
  get getters(): string[] {
    return this._getters;
  }
}
