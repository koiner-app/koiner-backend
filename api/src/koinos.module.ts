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
    {
      provide: 'ActiveTransactionDataSerializer',
      useFactory: () => {
        return new Serializer(utils.ProtocolTypes, {
          defaultTypeName: 'active_transaction_data',
        });
      },
    },
    {
      provide: 'PassiveTransactionDataSerializer',
      useFactory: () => {
        return new Serializer(utils.ProtocolTypes, {
          defaultTypeName: 'passive_transaction_data',
        });
      },
    },
  ],
  exports: [
    Provider,
    Signer,
    'ActiveTransactionDataSerializer',
    'PassiveTransactionDataSerializer',
  ],
})
export class KoinosModule {}
