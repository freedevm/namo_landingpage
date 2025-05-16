import { useWallet } from '../hooks/useWallet';

const CustomModal = ({ isOpen, onRequestClose }) => {
  const { walletType, setWalletType, walletTypes, connectWallet } = useWallet();

  if (!isOpen) return null;

  const handleConnect = (type) => {
    setWalletType(type);
    connectWallet();
    onRequestClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-white">Connect Wallet</h2>
        <div className="space-y-4">
          {Object.keys(walletTypes).map((type) => (
            <button
              key={type}
              onClick={() => handleConnect(type)}
              className="w-full flex items-center gap-2 p-2 bg-zinc-800 hover:bg-zinc-700 rounded text-white"
            >
              {walletTypes[type].label}
            </button>
          ))}
        </div>
        <button
          onClick={onRequestClose}
          className="mt-4 w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomModal;