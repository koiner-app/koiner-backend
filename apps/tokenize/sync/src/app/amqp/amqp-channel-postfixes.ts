import { koinosConfig } from '@koinos/jsonrpc';

export const AmqpChannelPostfixes = [
  'abc',
  'def',
  'ghi',
  'jkl',
  'mno',
  'pqr',
  'stu',
  'vwx',
  'yz0',
  '123',
  '456',
  '789',
];

export const AmqpTokenChannels = [
  {
    suffix: 'koin',
    contractId: koinosConfig.contracts.koin,
  },
  {
    suffix: 'vhp',
    contractId: koinosConfig.contracts.vhp,
  },
];
