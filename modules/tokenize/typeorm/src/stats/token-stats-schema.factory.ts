import {
  EntityProps,
  EntitySchemaFactory,
  EntitySchemaProps,
} from '@appvise/typeorm';
import { ChainId } from '@koiner/domain';
import { TokenStats, TokenStatsProps } from '@koiner/tokenize/domain';
import { TokenStatsSchema } from '.';

export class TokenStatsSchemaFactory extends EntitySchemaFactory<
  TokenStats,
  TokenStatsSchema
> {
  protected toDomainProps(
    entitySchema: TokenStatsSchema
  ): EntityProps<TokenStatsProps> {
    const id = new ChainId(entitySchema.id);

    const props: TokenStatsProps = {
      contractCount: parseInt(entitySchema.contract_count.toString()),
      transferCount: parseInt(entitySchema.transfer_count.toString()),
    };

    return { id, props };
  }

  protected toSchemaProps(
    entity: TokenStats
  ): EntitySchemaProps<TokenStatsSchema> {
    const props = entity.getPropsCopy();

    return {
      contract_count: props.contractCount,
      transfer_count: props.transferCount,
    };
  }
}
