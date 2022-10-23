import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { snakeToCamelCase, TypeormReadRepository } from '@appvise/typeorm';
import { NotFoundException, SelectionSet } from '@appvise/domain';
import {
  BlockProductionStats,
  BlockProductionStatsReadRepository,
} from '@koiner/network/domain';
import {
  BlockProductionStatsSchema,
  BlockProductionStatsSchemaFactory,
} from '.';

@Injectable()
export class BlockProductionStatsReadTypeormRepository
  extends TypeormReadRepository<
    BlockProductionStats,
    BlockProductionStatsSchema
  >
  implements BlockProductionStatsReadRepository
{
  constructor(
    @InjectRepository(BlockProductionStatsSchema)
    override readonly entityModel: Repository<BlockProductionStatsSchema>
  ) {
    super(
      entityModel,
      new BlockProductionStatsSchemaFactory(
        BlockProductionStats,
        BlockProductionStatsSchema
      ),
      BlockProductionStatsSchema
    );
  }

  async findOneByContractId(
    contractId: string,
    selectionSet?: SelectionSet
  ): Promise<BlockProductionStats | undefined> {
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
      .where(`${queryBuilder.alias}.contract_id = :contractId`, {
        contractId: `${contractId}`,
      })
      .getOne();

    return entityDocument
      ? this.entitySchemaFactory.toDomain(entityDocument)
      : undefined;
  }

  async findOneByContractIdOrThrow(
    contractId: string,
    selectionSet?: SelectionSet
  ): Promise<BlockProductionStats> {
    const entityDocument = await this.findOneByContractId(
      contractId,
      selectionSet
    );

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return entityDocument;
  }
}
