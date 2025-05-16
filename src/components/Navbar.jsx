import React from 'react';
import WalletConnect from './WalletConnect';
import { Link } from 'react-router-dom';
import { useContract } from '../context/ContractContext';

export default function Navbar({ active, setActive }) {
  const { tokenPrice, isLoading, isError } = useContract();

  return (
    <nav className="w-full flex items-center justify-between px-48 py-4 bg-black border-b border-zinc-800">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center">
          <img src="./assets/logo.png" alt="logo" className="h-12 w-12" />
          <span className="text-lg font-bold text-white ml-2">NAMO</span>
        </Link>
      </div>

      {/* Price & Wallet */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-xs text-green-400">
          <img src="./assets/logo.png" alt="token-icon" className="h-6 w-6" />
          {isLoading ? 'Loading...' : isError ? '$0.00' : `$${tokenPrice || '0.00'}`}
        </div>
        <WalletConnect setActive={setActive} active={active} />
      </div>
    </nav>
  );
}