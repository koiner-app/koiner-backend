import { AggregateRoot } from '@appvise/domain';
import {
  EntitySchemaFactory,
  EntityBaseSchema,
  TypeormReadRepository,
  TypeormRepository,
  TypeormWriteRepository,
} from '.';
import { Connection } from 'typeorm';

// instead of import { Type } from '@nestjs/common';
export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export class TypeormRepositoryProvider {
  static provide<
    TRepository,
    TEntity extends AggregateRoot<unknown>,
    TEntitySchema extends EntityBaseSchema,
    TEntitySchemaFactory extends EntitySchemaFactory<TEntity, TEntitySchema>,
  >(
    repository: TRepository,
    schemaType: Type<TEntitySchema>,
    schemaFactory: TEntitySchemaFactory,
  ) {
    return {
      provide: repository,
      useFactory: (connection: Connection) => {
        // Check if ReadRepository is implemented
        if (repository.toString().includes('ReadRepository')) {
          return new TypeormReadRepository<TEntity, TEntitySchema>(
            connection.getRepository(schemaType),
            schemaFactory,
            schemaType,
          );
        }

        // Check if WriteRepository is implemented
        if (repository.toString().includes('WriteRepository')) {
          return new TypeormWriteRepository<TEntity, TEntitySchema>(
            connection.getRepository(schemaType),
            schemaFactory,
            schemaType,
          );
        }

        // Otherwise, return read + write combined repository
        return new TypeormRepository<TEntity, TEntitySchema>(
          connection.getRepository(schemaType),
          schemaFactory,
          schemaType,
        );
      },
      inject: [Connection],
    };
  }
}
