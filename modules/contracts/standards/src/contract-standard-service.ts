import { ContractStandardType, ContractStandardWithValues } from '.';

export abstract class ContractStandardService {
  abstract getForContract(
    contractId: string,
    contractStandardType?: ContractStandardType
  ): Promise<ContractStandardWithValues | undefined>;
  abstract decodeOperation(
    contractId: string,
    entryPoint: number,
    args: string,
    contractStandardType?: ContractStandardType
  ): Promise<{ name: string; data?: any }>;
  abstract decodeEvent(
    contractId: string,
    name: string,
    args: string
  ): Promise<{ name: string; entryPoint?: number; data?: any }>;
}
