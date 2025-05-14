import { useState,useEffect,useRef } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { ChevronDown, Repeat } from "lucide-react";
import { SiBinance,SiTether,SiEthereum } from 'react-icons/si';
export default function SwapComponent({active}) {
const dropdownRef = useRef(null);
  const [amountBNB, setAmountBNB] = useState(0);
  const [amountNamo, setamountNamo] = useState(0);
  const [crypto, setCrypto] = useState({
    name: "BNB",
    icon: SiBinance
  })
  const [price, setPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  let totalPrice = 0;
  const getTotalPrice = (tokenAmount) =>{
      totalPrice = tokenAmount * 0.12;
      setPrice(totalPrice);
      setamountNamo(tokenAmount);
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <div className=" bg-black text-white flex flex-wrap items-center justify-center pt-44 pb-48">
   
      <Card className="bg-zinc-900 text-white w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4">Buy</h2>
          <div className="bg-zinc-800 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2 items-center">
               <img src="./assets/logo.png" alt="BNB" className="w-6 h-6" />
                <span>NAMO</span>
              </div>
              {/* <ChevronDown size={16} /> */}
            </div>
            <Input
              className="bg-zinc-700 text-white"
              value={amountNamo}
              onChange={(e)=>getTotalPrice(e.target.value)}
              // readOnly
            />
          </div>
          <div className="flex justify-center my-2">
            <Repeat className="text-zinc-400" />
          </div>
          <div className="bg-zinc-800 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2" ref={dropdownRef}>
              <div className="flex gap-2 items-center">
                {/* <img src="./assets/logo.png" alt="BNB" className="w-6 h-6" /> */}
                <SiBinance size={20} color="#F0B90B" />

                <span>{crypto.name}</span>
              </div>
              <ChevronDown size={16} onClick={toggleDropdown} aria-expanded={isOpen} aria-haspopup="true"/>
             
            </div>
             {isOpen && (
                <div
                  className="mt-2 rounded-md shadow-lg bg-gray-500 w-full mb-2"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="text-gray-700 flex px-4 py-2 text-sm hover:bg-gray-400"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                      
                      <SiBinance size={20} color="#F0B90B" />
                      <span className="ml-2">BNB</span>
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 flex px-4 py-2 text-sm hover:bg-gray-400"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                        <SiTether size={20} color="#26A17B" />
                        <span className="ml-2">USDT</span>
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 flex px-4 py-2 text-sm hover:bg-gray-400"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                     <SiEthereum size={20} color="#3C3C3D" />
                      <span className="ml-2">USDT</span>
                    </a>
                  </div>
                </div>
              )}
            <Input
              className="bg-zinc-700 text-white"
              value={price}
              onChange={(e) => setAmountBNB(e.target.value)}
              disabled
            />
        
          </div>
      
          { active ? (
            <Button className="w-full bg-green-500 hover:bg-green-600 text-black" >
              Buy
            </Button>
          ):(
          <Button className="w-full bg-green-500 hover:bg-green-600 text-black" >
            Connect Wallet
          </Button>
          )}
        </CardContent>
      </Card>
    </div>
     <footer className="w-full text-center text-sm text-zinc-500 p-[1.5rem] border-t  border-zinc-800  bg-black">
        {/* <p>Disclaimer: Mike Token project is not related to the Monsters movies. We simply admire the characters.</p> */}
        <p className="mt-1">Copyright © 2025 NamoToken</p>
      </footer>
    </>
  );
}
