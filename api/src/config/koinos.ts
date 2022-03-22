export const koinos = {
  mainChainId:
    process.env.KOINOS_SIGNER_SEED ??
    'QmeehjqATVaC4ReXxwbw4DQLbEdEAo8SmTBVzZz8s5ZV5F',
  rpcNodes: [process.env.KOINOS_RPC ?? 'http://api.koinos.io:8080'],
  signerSeed: process.env.KOINOS_SIGNER_SEED ?? 'seed',
};
