import {
  ContractStandard,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { utils } from 'koilib';

export const ContractStandards: ContractStandard[] = [
  new ContractStandard(ContractStandardType.krc20, 'Krc20', utils.tokenAbi, [
    'name',
    'symbol',
    'decimals',
  ]),
];
