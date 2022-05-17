import { AddressCommandHandlers } from './command';
import { AddressQueryHandlers } from './query';

export * from './command';
export * from './query';

export const AddressApplicationHandlers = [
  ...AddressCommandHandlers,
  ...AddressQueryHandlers,
];
