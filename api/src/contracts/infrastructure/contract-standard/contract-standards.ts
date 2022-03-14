import {
  ContractStandard,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { utils } from 'koilib';

const Krc20Abi = utils.Krc20Abi;

// TODO: Remove workaround when koilib is updated.
Krc20Abi.methods.name.entryPoint = 0x82a3537f;
Krc20Abi.methods.symbol.entryPoint = 0xb76a7ca1;
Krc20Abi.methods.decimals.entryPoint = 0xee80fd2f;
Krc20Abi.methods.totalSupply.entryPoint = 0xb0da3934;
Krc20Abi.methods.balanceOf.entryPoint = 0x5c721497;
Krc20Abi.methods.transfer.entryPoint = 0x27f576ca;
Krc20Abi.methods.mint.entryPoint = 0xdc6f17bb;

export const ContractStandards: ContractStandard[] = [
  new ContractStandard(ContractStandardType.krc20, 'Krc20', Krc20Abi, [
    'name',
    'symbol',
    'decimals',
  ]),
];
