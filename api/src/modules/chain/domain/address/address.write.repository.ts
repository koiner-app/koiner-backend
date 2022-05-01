import { WriteRepository } from '@appvise/domain';
import { Address } from './address';

export abstract class AddressWriteRepository extends WriteRepository<Address> {}
