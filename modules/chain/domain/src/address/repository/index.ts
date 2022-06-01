import { ReadRepository, WriteRepository } from '@appvise/domain';
import { Address } from '..';

export abstract class AddressReadRepository extends ReadRepository<Address> {}
export abstract class AddressWriteRepository extends WriteRepository<Address> {}
