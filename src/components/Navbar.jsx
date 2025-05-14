import React from "react";
import WalletConnect from "./WalletConnect";
import { Link } from 'react-router-dom';
export default function Navbar({active, setActive,setdata, data}) {
  
  return (
    <nav className="w-full flex items-center justify-between px-48 py-4 bg-black border-b border-zinc-800">
      {/* Logo */}
      <div className="flex items-center gap-2">

       <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center">
          <img src="./assets/logo.png" alt="logo" className="h-12 w-12" />
          <span className="text-lg font-bold text-white ml-2">NAMO</span>
        </Link>
      </div>
        
      </div>

      {/* Nav Links */}
      {/* <div className="flex items-center gap-6 text-sm text-white">
        <a href="#" className="hover:text-green-500">Home</a>
        <a href="#" className="hover:text-green-500">Liquidity</a>
        <a href="#" className="text-green-500">Swap</a>
        <a href="#" className="hover:text-green-500">Pools</a>
        <a href="#" className="hover:text-green-500">Farms</a>
        <a href="#" className="hover:text-green-500">Docs</a>
      </div> */}

      {/* Price & Wallet */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-xs text-green-400">
          <img src="./assets/logo.png" alt="token-icon" className="h-6 w-6" />
          $0.12
        </div>
           <WalletConnect setActive={setActive} active={active} setdata={setdata} data={data}/>
      </div>
    </nav>
  );
}
