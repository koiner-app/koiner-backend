export const koinos = {
  chainId:
    process.env.KOINOS_CHAIN_ID ??
    'QmeehjqATVaC4ReXxwbw4DQLbEdEAo8SmTBVzZz8s5ZV5F',
  rpcNodes: process.env.KOINOS_RPC ?? ['http://api.koinos.io:8080'],
  signerSeed: process.env.KOINOS_SIGNER_SEED ?? 'seed',
  koinContractId:
    process.env.KOIN_CONTRACT_ID ?? '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ',
  batchSize: process.env.BATCH_SIZE
    ? parseInt(<string>process.env.BATCH_SIZE)
    : 250,
  syncSecret: process.env.SYNC_SECRET,
};
