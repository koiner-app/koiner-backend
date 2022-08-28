import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  TokenBalance,
  TokenBalanceReadRepository,
  TokenBalanceWriteRepository,
  TokenContract,
  TokenContractReadRepository,
  TokenContractWriteRepository,
  TokenEvent,
  TokenEventReadRepository,
  TokenEventWriteRepository,
  TokenOperation,
  TokenOperationReadRepository,
  TokenOperationWriteRepository,
} from '@koiner/contracts/domain';
import {
  TokenBalanceSchema,
  TokenBalanceSchemaFactory,
  TokenBalanceWriteTypeormRepository,
  TokenContractSchema,
  TokenContractSchemaFactory,
  TokenEventSchema,
  TokenEventSchemaFactory,
  TokenOperationSchema,
  TokenOperationSchemaFactory,
} from '.';

// Factories
const tokenBalanceSchemaFactory = new TokenBalanceSchemaFactory(
  TokenBalance,
  TokenBalanceSchema
);

const tokenContractSchemaFactory = new TokenContractSchemaFactory(
  TokenContract,
  TokenContractSchema
);

const tokenEventSchemaFactory = new TokenEventSchemaFactory(
  TokenEvent,
  TokenEventSchema
);

const tokenOperationSchemaFactory = new TokenOperationSchemaFactory(
  TokenOperation,
  TokenOperationSchema
);

export const TokenRepositories: Provider[] = [
  // TokenBalance
  TypeormRepositoryProvider.provide(
    TokenBalanceReadRepository,
    TokenBalanceSchema,
    tokenBalanceSchemaFactory
  ),
  {
    provide: TokenBalanceWriteRepository,
    useClass: TokenBalanceWriteTypeormRepository,
  },

  // TokenContract
  TypeormRepositoryProvider.provide(
    TokenContractReadRepository,
    TokenContractSchema,
    tokenContractSchemaFactory
  ),
  TypeormRepositoryProvider.provide(
    TokenContractWriteRepository,
    TokenContractSchema,
    tokenContractSchemaFactory,
    false
  ),

  // TokenEvent
  TypeormRepositoryProvider.provide(
    TokenEventReadRepository,
    TokenEventSchema,
    tokenEventSchemaFactory
  ),
  TypeormRepositoryProvider.provide(
    TokenEventWriteRepository,
    TokenEventSchema,
    tokenEventSchemaFactory,
    false
  ),

  // TokenOperation
  TypeormRepositoryProvider.provide(
    TokenOperationReadRepository,
    TokenOperationSchema,
    tokenOperationSchemaFactory
  ),
  TypeormRepositoryProvider.provide(
    TokenOperationWriteRepository,
    TokenOperationSchema,
    tokenOperationSchemaFactory,
    false
  ),
];
