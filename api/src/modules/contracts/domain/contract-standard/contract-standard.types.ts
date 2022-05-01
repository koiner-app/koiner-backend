import { ContractStandard } from '@koiner/contracts/domain';

export enum ContractStandardType {
  token = 'token',
}

export interface ContractStandardWithValues {
  contractStandard: ContractStandard;
  contractValues: Record<string, unknown>;
}
