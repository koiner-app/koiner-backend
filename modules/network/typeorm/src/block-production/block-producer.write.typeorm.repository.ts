import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { snakeToCamelCase, TypeormWriteRepository } from '@appvise/typeorm';
import { Logger, SelectionSet } from '@appvise/domain';
import {
  BlockProducer,
  BlockProducerWriteRepository,
} from '@koiner/network/domain';
import { BlockProducerSchema, BlockProducerSchemaFactory } from '.';

@Injectable()
export class BlockProducerWriteTypeormRepository
  extends TypeormWriteRepository<BlockProducer, BlockProducerSchema>
  implements BlockProducerWriteRepository
{
  constructor(
    @InjectRepository(BlockProducerSchema)
    override readonly entityModel: Repository<BlockProducerSchema>,
    override readonly logger: Logger
  ) {
    super(
      entityModel,
      new BlockProducerSchemaFactory(BlockProducer, BlockProducerSchema),
      BlockProducerSchema,
      logger,
      false
    );
  }

  async findOne(
    addressId: string,
    contractId: string,
    selectionSet?: SelectionSet
  ): Promise<BlockProducer | undefined> {
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
      .where(
        `${queryBuilder.alias}.address_id = :addressId AND ${queryBuilder.alias}.contract_id = :contractId`,
        { addressId: `${addressId}`, contractId: `${contractId}` }
      )
      .getOne();

    return entityDocument
      ? this.entitySchemaFactory.toDomain(entityDocument)
      : undefined;
  }
}
