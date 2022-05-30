import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, SelectionSet } from '@appvise/domain';
import { snakeToCamelCase, TypeormReadRepository } from '@appvise/typeorm';
import {
  BlockReward,
  BlockRewardReadRepository,
} from '@koiner/contracts/domain';
import { BlockRewardSchema, BlockRewardSchemaFactory } from '.';

@Injectable()
export class BlockRewardReadTypeormRepository
  extends TypeormReadRepository<BlockReward, BlockRewardSchema>
  implements BlockRewardReadRepository
{
  constructor(
    @InjectRepository(BlockRewardSchema)
    override readonly entityModel: Repository<BlockRewardSchema>
  ) {
    super(
      entityModel,
      new BlockRewardSchemaFactory(BlockReward, BlockRewardSchema),
      BlockRewardSchema
    );
  }

  async findOneByHeight(
    height: number,
    selectionSet?: SelectionSet
  ): Promise<BlockReward | undefined> {
    // Create QueryBuilder
    const queryBuilder = this.entityModel.createQueryBuilder(
      this.entityType.name
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
          relation.propertyPath
        );
      }
    }

    const entityDocument = await queryBuilder
      .where(`${queryBuilder.alias}.block_height = :height`, {
        height: `${height}`,
      })
      .getOne();

    return entityDocument
      ? this.entitySchemaFactory.toDomain(entityDocument)
      : undefined;
  }

  async findOneByHeightOrThrow(
    height: number,
    selectionSet?: SelectionSet
  ): Promise<BlockReward> {
    const entityDocument = await this.findOneByHeight(height, selectionSet);

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return entityDocument;
  }
}
