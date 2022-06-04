import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  Address,
  AddressReadRepository,
  AddressWriteRepository,
} from '@koiner/contracts/domain';
import { AddressSchema, AddressSchemaFactory } from '.';

// Factories
const addressSchemaFactory = new AddressSchemaFactory(Address, AddressSchema);

export const AddressRepositories: Provider[] = [
  // Address
  TypeormRepositoryProvider.provide(
    AddressReadRepository,
    AddressSchema,
    addressSchemaFactory
  ),
  TypeormRepositoryProvider.provide(
    AddressWriteRepository,
    AddressSchema,
    addressSchemaFactory,
    false
  ),
];
