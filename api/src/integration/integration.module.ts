import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import Automations from '@koiner/integration/automation';
import GraphQLResolvers from '@koiner/integration/api/graphql';
import { ChainModule } from '@koiner/chain/chain.module';
import { ContractsModule } from '@koiner/contracts/contracts.module';

@Module({
  imports: [CqrsModule, ChainModule, ContractsModule],
  providers: [...Automations, ...GraphQLResolvers],
})
export class IntegrationModule {}
