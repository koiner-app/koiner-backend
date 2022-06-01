import {
  ContractStandard,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { utils } from 'koilib';

export const ContractStandards: ContractStandard[] = [
  new ContractStandard(ContractStandardType.token, 'Token', utils.tokenAbi, [
    'name',
    'symbol',
    'decimals',
  ]),
];
