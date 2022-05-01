import { ReadRepository } from '@appvise/domain';
import { Address } from './address';

export abstract class AddressReadRepository extends ReadRepository<Address> {}
