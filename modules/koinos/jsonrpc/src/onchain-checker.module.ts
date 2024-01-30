import { Module } from '@nestjs/common';
import { KoinosModule } from './koinos.module';
import { AddressBalanceService } from './service/address-balance.service';
import { TotalSupplyService } from './service/total-supply-service';

@Module({
  imports: [KoinosModule],
  providers: [AddressBalanceService, TotalSupplyService],
  exports: [AddressBalanceService, TotalSupplyService],
})
export class OnChainCheckerModule {}
