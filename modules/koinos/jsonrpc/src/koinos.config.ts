// TODO: Load from app config file
export const koinosConfig = {
  rpcNodes: process.env.JSONRPC_NODES
    ? JSON.parse(process.env.JSONRPC_NODES)
    : ['https://api.koinos.io'],
  signerSeed: 'seed',
};
