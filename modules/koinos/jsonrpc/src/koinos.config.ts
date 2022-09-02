// TODO: Load from app config file
export const koinosConfig = {
  rpcNodes: process.env.KOINOS_RPC_NODES
    ? JSON.parse(process.env.KOINOS_RPC_NODES)
    : ['https://api.koinos.io'],
  signerSeed: 'seed',
};
