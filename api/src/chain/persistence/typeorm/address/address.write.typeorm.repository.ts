import { TypeormWriteRepository } from '@appvise/typeorm';
import { Injectable } from '@nestjs/common';
import {
  AddressSchema,
  AddressSchemaFactory,
} from '@koiner/chain/persistence/typeorm';
import { Address, AddressWriteRepository } from '@koiner/chain/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressWriteTypeormRepository
  extends TypeormWriteRepository<Address, AddressSchema>
  implements AddressWriteRepository
{
  constructor(
    @InjectRepository(AddressSchema)
    readonly entityModel: Repository<AddressSchema>,
  ) {
    super(entityModel, new AddressSchemaFactory(Address, AddressSchema));
  }

  async exists(id: string): Promise<boolean> {
    const found = await this.findOneById(id);

    return !!found;
  }
}
