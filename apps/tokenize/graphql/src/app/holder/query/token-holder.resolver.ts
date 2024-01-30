import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { SelectionSet } from '@appvise/graphql';
import { TokenHolderQuery } from '@koiner/tokenize/application';
import { TokenHolderNode } from '../dto';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { QueryBus } from '@nestjs/cqrs';
import { TokenHolder } from '@koiner/tokenize/domain';
import { AddressBalanceService } from '@koinos/jsonrpc';

@Resolver(() => TokenHolderNode)
export class TokenHolderResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly addressBalanceService: AddressBalanceService
  ) {}

  @Query(() => TokenHolderNode, { name: 'tokenHolder' })
  async execute(
    @Args({ name: 'id', type: () => ID }) id: string,
    @SelectionSet() selectionSet: SelectionSetObject
  ): Promise<TokenHolderNode> {
    let entity = await this.queryBus.execute<TokenHolderQuery, TokenHolder>(
      new TokenHolderQuery(id, selectionSet)
    );

    const onChainBalance = await this.addressBalanceService.getBalance(
      entity.contractId.value,
      entity.addressId.value,
      undefined,
      false
    );

    if (onChainBalance > -1) {
      console.log({
        onChainBalance,
        old: entity.balance,
      });

      entity = new TokenHolder({
        id: entity.id,
        props: {
          ...entity.getPropsCopy(),
          balance: onChainBalance,
        },
      });
    }

    return new TokenHolderNode(entity);
  }
}
