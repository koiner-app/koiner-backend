import { snakeToCamelCase, TypeormReadRepository } from '@appvise/typeorm';
import { Injectable } from '@nestjs/common';
import {
  BlockSchema,
  BlockSchemaFactory,
} from '@koiner/chain/persistence/typeorm';
import { NotFoundException, SelectionSet } from '@appvise/domain';
import { Block, BlockReadRepository } from '@koiner/chain/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    // Create QueryBuilder
    const queryBuilder = this.entityModel.createQueryBuilder(
      this.entityType.name,
    );

    // Join with relations if selected
    for (const relation of this.entityModel.metadata.relations) {
      // Convert schema key to camel case
      const camelCaseRelation = snakeToCamelCase(relation.propertyPath);

      if (
        // Ignore soft relations starting with _
        relation.propertyPath[0] !== '_' &&
        (!selectionSet || selectionSet.isSelected(camelCaseRelation))
      ) {
        queryBuilder.leftJoinAndSelect(
          `${this.entityType.name}.${relation.propertyPath}`,
          relation.propertyPath,
        );
      }
    }

    const entityDocument = await queryBuilder
      .where(`${queryBuilder.alias}.height = :height`, { height: `${height}` })
      .getOne();

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
