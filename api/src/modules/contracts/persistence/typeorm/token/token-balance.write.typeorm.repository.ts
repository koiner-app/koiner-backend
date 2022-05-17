import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { snakeToCamelCase, TypeormWriteRepository } from '@appvise/typeorm';
import { Logger, SelectionSet } from '@appvise/domain';
import {
  TokenBalance,
  TokenBalanceWriteRepository,
} from '@koiner/contracts/domain';
import { TokenBalanceSchema, TokenBalanceSchemaFactory } from '.';

@Injectable()
export class TokenBalanceWriteTypeormRepository
  extends TypeormWriteRepository<TokenBalance, TokenBalanceSchema>
  implements TokenBalanceWriteRepository
{
  constructor(
    @InjectRepository(TokenBalanceSchema)
    readonly entityModel: Repository<TokenBalanceSchema>,
    readonly logger: Logger,
  ) {
    super(
      entityModel,
      new TokenBalanceSchemaFactory(TokenBalance, TokenBalanceSchema),
      TokenBalanceSchema,
      logger,
      false,
    );
  }

  async findOne(
    addressId: string,
    contractId: string,
    selectionSet?: SelectionSet,
  ): Promise<TokenBalance | undefined> {
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
