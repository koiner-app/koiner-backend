export const koinosConfig = {
  chainId: process.env.CHAIN_ID,
  rpcNodes: process.env.JSONRPC_NODES
    ? JSON.parse(process.env.JSONRPC_NODES)
    : ['https://api.koinos.io'],
  signerSeed: 'seed',
  contracts: {
    koin: process.env.KOIN_CONTRACT_ID,
    vhp: process.env.VHP_CONTRACT_ID,
    pob: process.env.POB_CONTRACT_ID,
  },
  syncSecret: process.env.SYNC_SECRET,
};
