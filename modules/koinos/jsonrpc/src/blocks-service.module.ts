import { Module } from '@nestjs/common';
import { KoinerCacheModule } from '@koiner/nestjs-utils';
import { RawBlocksService } from './raw-blocks.service';
import { KoinosModule } from './koinos.module';

@Module({
  imports: [KoinosModule, KoinerCacheModule],
  providers: [RawBlocksService],
  exports: [RawBlocksService],
})
export class BlocksServiceModule {}
