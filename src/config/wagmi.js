import { http } from 'wagmi';
import { mainnet, bsc, bscTestnet } from 'wagmi/chains';
import { createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';

// Use your actual Alchemy API key
const ALCHEMY_API_KEY = 'VvvXuTxKhe0crIcgxiUSc2Bvf9NcT4bT'; // Replace with your key

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
      http: [`https://bnb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`],
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
      http: [`https://bnb-testnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`],
    },
  },
};

export const config = createConfig({
  chains: [bnbMainnet, bnbTestnet],
  transports: {
    [bnbMainnet.id]: http(),
    [bnbTestnet.id]: http(),
  },
  connectors: [injected()], // Support for MetaMask
});