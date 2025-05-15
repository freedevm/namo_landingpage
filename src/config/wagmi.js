import { http } from 'wagmi';
import { mainnet, bsc, bscTestnet } from 'wagmi/chains';
import { createConfig } from 'wagmi';

// Define custom BNB Mainnet and Testnet with Alchemy RPC URLs
const bnbMainnet = {
  ...bsc,
  id: 56,
  name: 'BNB Smart Chain Mainnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://bnb-mainnet.g.alchemy.com/v2/VvvXuTxKhe0crIcgxiUSc2Bvf9NcT4bT'],
    },
  },
};

const bnbTestnet = {
  ...bscTestnet,
  id: 97,
  name: 'BNB Smart Chain Testnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'tBNB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://bnb-testnet.g.alchemy.com/v2/VvvXuTxKhe0crIcgxiUSc2Bvf9NcT4bT'],
    },
  },
};

// Configure wagmi with the custom chains
export const config = createConfig({
  chains: [bnbMainnet, bnbTestnet],
  transports: {
    [bnbMainnet.id]: http(),
    [bnbTestnet.id]: http(),
  },
});