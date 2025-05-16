import { useState, useEffect } from 'react';
import { useConnect, useAccount } from 'wagmi';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { toast } from 'react-toastify';
import { WALLET_CONNECT_PROJECT_ID } from '../config/wallet';

// Supported wallet types
const WALLET_TYPES = {
  metaMask: {
    label: 'MetaMask',
    connector: () => injected({ target: 'metaMask' }),
  },
  walletConnect: {
    label: 'WalletConnect',
    connector: () => walletConnect({ projectId: WALLET_CONNECT_PROJECT_ID, showQrModal: true }),
  },
  coinbaseWallet: {
    label: 'Coinbase Wallet',
    connector: () => coinbaseWallet({ appName: 'NAMO Token' }),
  },
};

export const useWallet = () => {
  const [walletType, setWalletType] = useState('metaMask');
  const { connect, error: connectError } = useConnect();
  const { isConnected } = useAccount();

  // Handle connection errors
  useEffect(() => {
    if (connectError) {
      console.error('Connection error:', connectError);
      toast.error('Failed to connect wallet: ' + connectError.message, {
        toastId: 'connect-error',
      });
    }
  }, [connectError]);

  const connectWallet = () => {
    try {
      const selectedWallet = WALLET_TYPES[walletType];
      if (!selectedWallet) {
        throw new Error('Invalid wallet type');
      }
      const connector = selectedWallet.connector();
      connect({ connector });
    } catch (err) {
      console.error('Connection failed:', err);
      toast.error('Connection failed: ' + err.message, {
        toastId: 'connect-failed',
      });
    }
  };

  return {
    walletType,
    setWalletType,
    walletTypes: WALLET_TYPES,
    connectWallet,
    isConnected,
  };
};