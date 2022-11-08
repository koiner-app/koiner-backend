export const koinosConfig = {
  chainId: process.env.CHAIN_ID,
  rpcNodes: process.env.JSONRPC_NODES
    ? JSON.parse(process.env.JSONRPC_NODES)
    : ['https://api.koinos.io'],
  signerSeed: 'seed',
  contracts: {
    koin: process.env.KOIN_CONTRACT_ID ?? '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL',
    vhp: process.env.VHP_CONTRACT_ID ?? '1AdzuXSpC6K9qtXdCBgD5NUpDNwHjMgrc9',
    pob: process.env.POB_CONTRACT_ID ?? '159myq5YUhhoVWu3wsHKHiJYKPKGUrGiyv',
  },
  syncSecret: process.env.SYNC_SECRET,
};
