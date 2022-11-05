import { Module } from '@nestjs/common';
import { Provider, Signer } from 'koilib';
import { koinosConfig } from './koinos.config';
import { KoinerCacheModule } from '@koiner/nestjs-utils';
import { RawBlocksService } from './raw-blocks.service';

@Module({
  imports: [KoinerCacheModule],
  providers: [
    {
      provide: Provider,
      useFactory: () => {
        return new Provider(koinosConfig.rpcNodes);
      },
    },
    {
      provide: Signer,
      useFactory: () => {
        return Signer.fromSeed(koinosConfig.signerSeed);
      },
    },
    RawBlocksService,
  ],
  exports: [Provider, Signer, RawBlocksService],
})
export class KoinosModule {}
