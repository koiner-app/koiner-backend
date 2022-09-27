// TODO: Load from app config file
export const koinosConfig = {
  chainId: 'QmeehjqATVaC4ReXxwbw4DQLbEdEAo8SmTBVzZz8s5ZV5F',
  rpcNodes: process.env.JSONRPC_NODES
    ? JSON.parse(process.env.JSONRPC_NODES)
    : ['https://api.koinos.io'],
  signerSeed: 'seed',
  contracts: {
    koin: '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ',
    vhp: '1JZqj7dDrK5LzvdJgufYBJNUFo88xBoWC8',
    pob: '198RuEouhgiiaQm7uGfaXS6jqZr6g6nyoR',
  },
};
