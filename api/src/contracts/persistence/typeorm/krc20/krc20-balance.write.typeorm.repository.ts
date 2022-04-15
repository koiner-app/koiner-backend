import { TypeormWriteRepository } from '@appvise/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Krc20Balance,
  Krc20BalanceWriteRepository,
} from '@koiner/contracts/domain';
import {
  Krc20BalanceSchema,
  Krc20BalanceSchemaFactory,
} from '@koiner/contracts/persistence/typeorm';
import { Logger, SelectionSet } from '@appvise/domain';
import { snakeToCamelCase } from '@appvise/typeorm';

@Injectable()
export class Krc20BalanceWriteTypeormRepository
  extends TypeormWriteRepository<Krc20Balance, Krc20BalanceSchema>
  implements Krc20BalanceWriteRepository
{
  constructor(
    @InjectRepository(Krc20BalanceSchema)
    readonly entityModel: Repository<Krc20BalanceSchema>,
    readonly logger: Logger,
  ) {
    super(
      entityModel,
      new Krc20BalanceSchemaFactory(Krc20Balance, Krc20BalanceSchema),
      Krc20BalanceSchema,
      logger,
    );
  }

  async findOne(
    addressId: string,
    contractId: string,
    selectionSet?: SelectionSet,
  ): Promise<Krc20Balance | undefined> {
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
      .where(
        `${queryBuilder.alias}.address_id = :addressId AND ${queryBuilder.alias}.contract_id = :contractId`,
        { addressId: `${addressId}`, contractId: `${contractId}` },
      )
      .getOne();

    return entityDocument
      ? this.entitySchemaFactory.toDomain(entityDocument)
      : undefined;
  }
}
