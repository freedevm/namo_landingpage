import { useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useBalance, useSwitchChain } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { toast } from 'react-toastify';

// Preferred network based on environment (Testnet for development, Mainnet for production)
const PREFERRED_CHAIN_ID = process.env.NODE_ENV === 'production' ? 56 : 97; // 56 for Mainnet, 97 for Testnet

const WalletConnect = ({ active, setActive }) => {
  const { address, isConnected, chain } = useAccount();
  const { connect, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  // Fetch balance for the connected address
  const { data: balance } = useBalance({
    address: address,
    enabled: !!address,
  });

  // Update active state and handle network switching
  useEffect(() => {
    setActive(isConnected);

    if (isConnected && chain) {
      if (chain.id !== 56 && chain.id !== 97) {
        // Unsupported network
        toast.error(`Unsupported network (${chain.name}). Please switch to BNB Mainnet or Testnet.`, {
          toastId: 'unsupported-network',
        });
      } else if (chain.id !== PREFERRED_CHAIN_ID) {
        // Notify user of network change and attempt to switch to preferred network
        toast.warn(`Network changed to ${chain.name}. Switching to ${PREFERRED_CHAIN_ID === 56 ? 'BNB Mainnet' : 'BNB Testnet'}.`, {
          toastId: 'network-changed',
        });
        try {
          switchChain({ chainId: PREFERRED_CHAIN_ID });
        } catch (err) {
          console.error('Failed to switch chain:', err);
          toast.error('Failed to switch network. Please switch manually.', {
            toastId: 'switch-failed',
          });
        }
      }
    }
  }, [isConnected, chain, setActive, switchChain]);

  // Handle connection errors
  useEffect(() => {
    if (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet: ' + error.message, {
        toastId: 'connect-error',
      });
    }
  }, [error]);

  const handleConnect = () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!', {
        toastId: 'no-metamask',
      });
      return;
    }
    if (isConnected) {
      disconnect();
      toast.info('Wallet disconnected.', {
        toastId: 'disconnected',
      });
    } else {
      try {
        connect({ connector: injected() });
      } catch (err) {
        console.error('Connection failed:', err);
        toast.error('Connection failed: ' + err.message, {
          toastId: 'connect-failed',
        });
      }
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded-xl cursor-pointer"
    >
      {isConnected
        ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)} (${
            balance?.formatted.slice(0, 6) || '0'
          } ${chain?.id === 97 ? 'tBNB' : 'BNB'})`
        : 'Connect Wallet'}
    </button>
  );
};

export default WalletConnect;