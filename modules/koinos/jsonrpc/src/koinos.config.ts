export const koinosConfig = {
  chainId:
    process.env.CHAIN_ID ?? 'QmeehjqATVaC4ReXxwbw4DQLbEdEAo8SmTBVzZz8s5ZV5F',
  rpcNodes: process.env.JSONRPC_NODES
    ? JSON.parse(process.env.JSONRPC_NODES)
    : ['https://api.koinos.io'],
  signerSeed: 'seed',
  contracts: {
    koin: process.env.KOIN_CONTRACT_ID ?? '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL',
    vhp: process.env.VHP_CONTRACT_ID ?? '18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr',
    vhp1: process.env.VHP1_CONTRACT_ID ?? '1AdzuXSpC6K9qtXdCBgD5NUpDNwHjMgrc9',
    pob: process.env.POB_CONTRACT_ID ?? '159myq5YUhhoVWu3wsHKHiJYKPKGUrGiyv',
  },
  syncSecret: process.env.SYNC_SECRET ?? 'secret',
};
