import { http } from 'wagmi';
import { mainnet, bsc, bscTestnet } from 'wagmi/chains';
import { createConfig } from 'wagmi';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { WALLET_CONNECT_PROJECT_ID, ALCHEMY_API_KEY } from './wallet';

// Replace with your actual Alchemy API key
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
  connectors: [
    injected({ target: 'metaMask' }), // MetaMask
    walletConnect({ projectId: WALLET_CONNECT_PROJECT_ID, showQrModal: false }), // WalletConnect
    coinbaseWallet({ appName: 'NAMO Token' }), // Coinbase Wallet
  ],
  autoConnect: false,
});