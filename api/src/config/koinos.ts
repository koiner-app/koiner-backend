export const koinos = {
  rpcNodes: [process.env.KOINOS_RPC ?? 'http://api.koinos.io:8080'],
  signerSeed: process.env.KOINOS_SIGNER_SEED ?? 'seed',
};
