// TODO: Load from app config file
export const koinos = {
  chainId: 'QmeehjqATVaC4ReXxwbw4DQLbEdEAo8SmTBVzZz8s5ZV5F',
  rpcNodes: process.env.KOINOS_RPC_NODES
    ? JSON.parse(process.env.KOINOS_RPC_NODES)
    : ['https://api.koinos.io'],
  signerSeed: 'seed',
  koinContractId: '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ',
  batchSize: 250,
  syncSecret: 'AHOY!',
};
