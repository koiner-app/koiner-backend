import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import GraphQLResolvers from '@koiner/integration/chain/graphql';
import { ChainModule } from '@koiner/chain/chain.module';
import { ContractsModule } from '@koiner/contracts/contracts.module';
import { SystemCallOperationTypeResolver } from '@koiner/chain/api/graphql/operation/detail-resolver/system-call-operation-type.resolver';
import { SystemContractOperationTypeResolver } from '@koiner/chain/api/graphql/operation/detail-resolver/system-contract-operation-type.resolver';
import { UploadContractOperationTypeResolver } from '@koiner/chain/api/graphql/operation/detail-resolver/upload-contract-operation-type.resolver';
import { ContractOperationTypeResolver } from '@koiner/contracts/api/graphql/operation/detail-resolver/contract-operation-type.resolver';

@Module({
  imports: [CqrsModule, ChainModule, ContractsModule],
  providers: [
    ...GraphQLResolvers,

    // OperationType Resolvers
    {
      provide: 'OperationTypeResolvers',
      useFactory: (r1, r2, r3, r4) => [r1, r2, r3, r4],
      inject: [
        // Chain
        SystemCallOperationTypeResolver,
        SystemContractOperationTypeResolver,
        UploadContractOperationTypeResolver,

        // Contracts
        ContractOperationTypeResolver,
      ],
    },
  ],
})
export class ChainIntegrationModule {}
