import {
  Args,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SelectionSet } from '@appvise/graphql';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { Type } from '@nestjs/common';
import { IsArray, ValidateNested } from 'class-validator';
import { Type as TypeDecorator } from 'class-transformer';

@ObjectType()
export class BulkMutationError {
  @Field()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export function BulkMutation<TEntity, TNode, TQuery, TInput>(
  inputType: Type<TInput>,
  nodeType: new (entity: TEntity) => TNode,
  queryType: new (itemId: string, selectionSet?: SelectionSetObject) => TQuery,
  queryName: string,
): any {
  const queryNameClass =
    queryName.substr(0, 1).toUpperCase() + queryName.substr(1);

  @InputType(`${queryNameClass}Input`)
  class BulkMutationInputClass {
    @Field((type) => [inputType])
    @IsArray()
    @TypeDecorator(() => inputType)
    @ValidateNested({ each: true })
    items: TInput[];
  }

  @ObjectType(`${queryNameClass}Result`)
  class BulkMutationResult {
    @Field((type) => Int)
    index: number;

    @Field((type) => nodeType, { nullable: true })
    node?: TNode;

    @Field((type) => BulkMutationError, { nullable: true })
    error?: BulkMutationError;

    constructor(index: number, node?: TNode, error?: BulkMutationError) {
      this.index = index;
      this.node = node;
      this.error = error;
    }
  }

  @ObjectType(`${queryNameClass}Response`)
  class BulkMutationResponse {
    @Field((type) => [BulkMutationResult])
    results: BulkMutationResult[];

    @Field(() => Int)
    errorCount: number;
  }

  @Resolver(() => nodeType, { isAbstract: true })
  abstract class BulkMutationResolver {
    protected constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus,
    ) {}

    @Mutation((returns) => BulkMutationResponse, { name: queryName })
    async execute(
      @Args('data', { type: () => BulkMutationInputClass })
      input: BulkMutationInputClass,
      @SelectionSet() selectionSet: SelectionSetObject,
    ): Promise<BulkMutationResponse> {
      const results: BulkMutationResult[] = [];
      let errorCount = 0;

      for (let index = 0; index < input.items.length; index++) {
        try {
          // Call abstract mutation in extender class
          const nodeId = await this.executeMutation(input.items[index]);

          // Retrieve created/updated entity
          const entity = await this.queryBus.execute<TQuery, TEntity>(
            new queryType(nodeId, selectionSet),
          );

          // Wrap entity in result set
          results.push(new BulkMutationResult(index, new nodeType(entity)));
        } catch (error) {
          errorCount++;

          // Add error for item
          results.push(
            new BulkMutationResult(
              index,
              undefined,
              new BulkMutationError(error.message),
            ),
          );
        }
      }

      return {
        results,
        errorCount,
      };
    }

    abstract executeMutation(input: TInput): Promise<string>;
  }

  return BulkMutationResolver;
}
