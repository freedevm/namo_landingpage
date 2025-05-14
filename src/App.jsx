import { useState } from "react";
import BuyNAMO from "./components/BuyNAMO";
import Navbar from "./components/Navbar";
import { formatEther } from "ethers";
import HomePage from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [wallet, setWallet] = useState(null);
  const [active, setActive] = useState(false);
   const [data, setdata] = useState({
        address: "",
        Balance: null,
    });

  return (
    <div>
     
      {/* <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">NAMO Coin Dashboard</h1>
        <WalletConnect setWallet={setWallet} />
      </header> */}

      {/* {wallet?.provider && ( */}
        <>
          {/* <TokenStats provider={wallet.provider} /> */}
          <Router>
             <Navbar setActive={setActive} active={active} data={data} setdata/>
            <Routes>
              <Route path="/" element={<HomePage />} />          {/* Home page */}
              <Route path="/buy" element={<BuyNAMO active={active}/>} />    {/* About page */}
            </Routes>
          </Router>
            {/* <h2 className="text-xl font-bold mb-2">NFT Marketplace</h2> */}
            {/* <NFTMarketplace /> */}
        
        </>
      {/* )} */}
     
    </div>
  );
}

export default App;
