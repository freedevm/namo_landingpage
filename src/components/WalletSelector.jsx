import React from 'react';

const WalletSelector = ({ walletType, setWalletType, walletTypes }) => {
  return (
    <select
      value={walletType}
      onChange={(e) => setWalletType(e.target.value)}
      className="w-full px-2 py-2 bg-zinc-800 text-white border-none rounded"
    >
      {Object.keys(walletTypes).map((type) => (
        <option key={type} value={type}>
          {walletTypes[type].label}
        </option>
      ))}
    </select>
  );
};

export default WalletSelector;