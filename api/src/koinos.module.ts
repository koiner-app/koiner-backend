import { Provider, Serializer, Signer, utils } from 'koilib';
import { Module } from '@nestjs/common';
import * as config from '@config';

@Module({
  providers: [
    {
      provide: Provider,
      useFactory: () => {
        return new Provider(config.koinos.rpcNodes);
      },
    },
    {
      provide: Signer,
      useFactory: () => {
        return Signer.fromSeed(config.koinos.signerSeed);
      },
    },
  ],
  exports: [Provider, Signer],
})
export class KoinosModule {}
