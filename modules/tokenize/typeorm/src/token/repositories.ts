import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  TokenContract,
  TokenContractReadRepository,
  TokenContractWriteRepository,
  TokenEvent,
  TokenEventReadRepository,
  TokenEventWriteRepository,
  TokenHolder,
  TokenHolderReadRepository,
  TokenHolderWriteRepository,
  TokenOperation,
  TokenOperationReadRepository,
  TokenOperationWriteRepository,
} from '@koiner/tokenize/domain';
import {
  TokenContractSchema,
  TokenContractSchemaFactory,
  TokenEventSchema,
  TokenEventSchemaFactory,
  TokenHolderSchema,
  TokenHolderSchemaFactory,
  TokenHolderWriteTypeormRepository,
  TokenOperationSchema,
  TokenOperationSchemaFactory,
} from '.';

// Factories
const tokenContractSchemaFactory = new TokenContractSchemaFactory(
  TokenContract,
  TokenContractSchema
);

const tokenEventSchemaFactory = new TokenEventSchemaFactory(
  TokenEvent,
  TokenEventSchema
);

const tokenHolderSchemaFactory = new TokenHolderSchemaFactory(
  TokenHolder,
  TokenHolderSchema
);

const tokenOperationSchemaFactory = new TokenOperationSchemaFactory(
  TokenOperation,
  TokenOperationSchema
);

export const TokenRepositories: Provider[] = [
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

  // TokenHolder
  TypeormRepositoryProvider.provide(
    TokenHolderReadRepository,
    TokenHolderSchema,
    tokenHolderSchemaFactory
  ),
  {
    provide: TokenHolderWriteRepository,
    useClass: TokenHolderWriteTypeormRepository,
  },

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
