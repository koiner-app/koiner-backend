import { ContractStandard } from '@koiner/contracts/domain';

export enum ContractStandardType {
  krc20 = 'krc20',
}

export interface ContractStandardWithValues {
  contractStandard: ContractStandard;
  contractValues: Record<string, unknown>;
}
