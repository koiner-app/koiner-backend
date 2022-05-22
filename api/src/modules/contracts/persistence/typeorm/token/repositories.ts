import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  TokenBalance,
  TokenBalanceReadRepository,
  TokenBalanceWriteRepository,
  TokenContract,
  TokenContractReadRepository,
  TokenContractWriteRepository,
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
  TokenOperationSchema,
  TokenOperationSchemaFactory,
} from '.';

// Factories
const tokenBalanceSchemaFactory = new TokenBalanceSchemaFactory(
  TokenBalance,
  TokenBalanceSchema,
);

const tokenContractSchemaFactory = new TokenContractSchemaFactory(
  TokenContract,
  TokenContractSchema,
);

const tokenOperationSchemaFactory = new TokenOperationSchemaFactory(
  TokenOperation,
  TokenOperationSchema,
);

export const TokenRepositories: Provider[] = [
  // TokenBalance
  TypeormRepositoryProvider.provide(
    TokenBalanceReadRepository,
    TokenBalanceSchema,
    tokenBalanceSchemaFactory,
  ),
  {
    provide: TokenBalanceWriteRepository,
    useClass: TokenBalanceWriteTypeormRepository,
  },

  // TokenContract
  TypeormRepositoryProvider.provide(
    TokenContractReadRepository,
    TokenContractSchema,
    tokenContractSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    TokenContractWriteRepository,
    TokenContractSchema,
    tokenContractSchemaFactory,
    false,
  ),

  // TokenOperation
  TypeormRepositoryProvider.provide(
    TokenOperationReadRepository,
    TokenOperationSchema,
    tokenOperationSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    TokenOperationWriteRepository,
    TokenOperationSchema,
    tokenOperationSchemaFactory,
    false,
  ),
];
