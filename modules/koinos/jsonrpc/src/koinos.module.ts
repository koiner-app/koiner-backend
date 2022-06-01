import { Provider, Signer } from 'koilib';
import { Module } from '@nestjs/common';
import { koinosConfig } from './koinos.config';

@Module({
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
  ],
  exports: [Provider, Signer],
})
export class KoinosModule {}
