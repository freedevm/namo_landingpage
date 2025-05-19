import React from 'react';
import WalletConnect from './WalletConnect';
import { Link } from 'react-router-dom';
import { useContract } from '../context/ContractContext';

export default function Navbar({ active, setActive }) {
  const { tokenPrice, isLoading, isError } = useContract();

  return (
    <div className='w-full'>
      <nav className="w-full flex items-center justify-between px-48 lg:px-48 md:px-10 sm:px-5 xs:px-5 py-4 bg-transparent border-b border-zinc-800">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <img src="./assets/logo.png" alt="logo" className="h-12 w-12" />
            <span className="text-lg font-bold text-white ml-2">NAMO</span>
          </Link>
        </div>

        {/* Price & Wallet */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs text-gray-950">
            <img src="./assets/logo.png" alt="token-icon" className="h-6 w-6 md:block sm:hidden xs:hidden" />
            {isLoading ? 'Loading...' : isError ? '$0.00' : `$${tokenPrice || '0.00'}`}
          </div>
          <WalletConnect setActive={setActive} active={active} />
        </div>
      </nav>
      
    </div>
  );
}