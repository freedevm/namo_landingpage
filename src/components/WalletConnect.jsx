// WalletConnect.jsx
import { useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useBalance, useSwitchChain } from 'wagmi';
import { injected } from 'wagmi/connectors';

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

  // Update active state and switch to BNB Testnet on connect
  useEffect(() => {
    setActive(isConnected);
    if (isConnected && chain?.id !== 97) { // Chain ID 97 for BNB Testnet
      try {
        switchChain({ chainId: 97 });
      } catch (err) {
        console.error('Failed to switch chain:', err);
      }
    }
  }, [isConnected, chain, setActive, switchChain]);

  // Handle connection errors
  useEffect(() => {
    if (error) {
      console.error('Connection error:', error);
      alert('Failed to connect wallet: ' + error.message);
    }
  }, [error]);

  const handleConnect = () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }
    if (isConnected) {
      disconnect();
    } else {
      try {
        connect({ connector: injected() });
      } catch (err) {
        console.error('Connection failed:', err);
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
          } ${chain?.testnet ? 'tBNB' : 'BNB'})`
        : 'Connect Wallet'}
    </button>
  );
};

export default WalletConnect;