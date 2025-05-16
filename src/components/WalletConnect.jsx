import { useState, useEffect } from 'react';
import { useAccount, useDisconnect, useBalance, useSwitchChain } from 'wagmi';
import { toast } from 'react-toastify';
import { useWallet } from '../hooks/useWallet';
import CustomModal from './CustomModal';

// Preferred network based on environment (Testnet for development, Mainnet for production)
const PREFERRED_CHAIN_ID = process.env.NODE_ENV === 'production' ? 56 : 97; // 56 for Mainnet, 97 for Testnet

const WalletConnect = () => {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { isConnected: walletConnected } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch balance for the connected address
  const { data: balance } = useBalance({
    address: address,
    enabled: !!address,
  });

  // Handle network switching
  useEffect(() => {
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
  }, [isConnected, chain, switchChain]);

  const handleConnect = () => {
    if (walletConnected) {
      disconnect();
      toast.info('Wallet disconnected.', {
        toastId: 'disconnected',
      });
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="flex items-center gap-2">
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
      <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default WalletConnect;