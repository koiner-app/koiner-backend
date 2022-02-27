import { TypeormReadRepository } from '@appvise/typeorm';
import { Injectable } from '@nestjs/common';
import {
  BlockSchema,
  BlockSchemaFactory,
} from '@koiner/chain/persistence/typeorm';
import { NotFoundException, SelectionSet } from '@appvise/domain';
import { Block, BlockReadRepository } from '@koiner/chain/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class BlockReadTypeormRepository
  extends TypeormReadRepository<Block, BlockSchema>
  implements BlockReadRepository
{
  constructor(
    @InjectRepository(BlockSchema)
    readonly entityModel: Repository<BlockSchema>,
  ) {
    super(entityModel, new BlockSchemaFactory(Block, BlockSchema), BlockSchema);
  }

  async findOneByHeight(
    height: number,
    selectionSet?: SelectionSet,
  ): Promise<Block | undefined> {
    // TODO: Use selectionSet for selecting fields
    const entityDocument = await this.entityModel.findOne({
      height: Equal(height),
    });

    return entityDocument
      ? this.entitySchemaFactory.toDomain(entityDocument)
      : undefined;
  }

  async findOneByHeightOrThrow(
    height: number,
    selectionSet?: SelectionSet,
  ): Promise<Block> {
    const entityDocument = await this.findOneByHeight(height, selectionSet);

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return entityDocument;
  }
}
