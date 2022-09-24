import { ContractStandardType, ContractStandardWithValues } from '.';

export abstract class ContractStandardService {
  abstract getForContract(
    contractId: string,
    contractStandardType?: ContractStandardType
  ): Promise<ContractStandardWithValues | undefined>;
  abstract decodeOperation(
    contractStandardType: ContractStandardType,
    contractId: string,
    entryPoint: number,
    args: string
  ): Promise<any>;
}
