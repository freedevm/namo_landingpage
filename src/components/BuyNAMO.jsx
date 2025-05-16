import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Repeat } from 'lucide-react';
import { SiBinance, SiTether } from 'react-icons/si';
import * as ethers from 'ethers';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { useContract } from '../context/ContractContext';
import { NAMOCOIN_ADDRESS, NAMOCOIN_ABI } from '../config/contract';
import { useWallet } from '../hooks/useWallet';
import CustomModal from '../components/CustomModal';

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
];

export default function BuyNAMO() {
  const [amountBNB, setAmountBNB] = useState(0);
  const [amountNamo, setAmountNamo] = useState(0);
  const [crypto, setCrypto] = useState({
    name: "BNB",
    icon: SiBinance,
  });
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [bnbUsdPrice, setBnbUsdPrice] = useState(null); // Store BNB/USD price
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { chain, isConnected } = useAccount();
  const { tokenPrice, isLoading: priceLoading, isError: priceError } = useContract();
  const { isConnected: walletConnected } = useWallet();

  // Fetch BNB/USD price from CoinGecko API
  useEffect(() => {
    const fetchBnbPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd');
        const data = await response.json();
        const price = data.binancecoin.usd;
        console.log("BNB/USD price:", price);
        setBnbUsdPrice(price);
      } catch (error) {
        console.error("Failed to fetch BNB/USD price:", error);
        toast.error("Failed to fetch BNB price. Using default value.", {
          toastId: 'bnb-price-fetch-failed',
        });
        setBnbUsdPrice(600); // Default BNB/USD price if API fails
      }
    };

    fetchBnbPrice();
    const interval = setInterval(fetchBnbPrice, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Initialize provider and contract when wallet is connected
  useEffect(() => {
    const init = async () => {
      if (isConnected && window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(NAMOCOIN_ADDRESS, NAMOCOIN_ABI, signer);
          setSigner(signer);
          setContract(contract);
        } catch (error) {
          console.error("Failed to initialize:", error);
          toast.error("Failed to initialize contract: " + error.message, {
            toastId: 'init-error',
          });
        }
      }
    };
    init();
  }, [isConnected]);

  // Handle cryptocurrency selection
  const handleCryptoSelect = (e) => {
    const selected = e.target.value;
    const iconMap = {
      BNB: SiBinance,
      USDT: SiTether,
      BUSD: SiBinance,
    };
    setCrypto({ name: selected, icon: iconMap[selected] });
  };

  // Calculate total price based on NAMO amount and selected cryptocurrency
  const getTotalPrice = (tokenAmount) => {
    const numAmount = parseFloat(tokenAmount) || 0;
    const namoPrice = priceLoading || priceError ? 0.0012 : parseFloat(tokenPrice);

    if (numAmount > 0) {
      if (crypto.name === "BNB" && bnbUsdPrice) {
        const totalUsd = numAmount * namoPrice;
        const bnbAmount = totalUsd / bnbUsdPrice;
        setAmountNamo(numAmount);
        setPrice(bnbAmount.toFixed(6)); // BNB amount with 6 decimals
      } else if (crypto.name === "USDT" || crypto.name === "BUSD") {
        const totalUsd = numAmount * namoPrice;
        const tokenAmount = totalUsd / 1; // 1 USDT/BUSD = 1 USD
        setAmountNamo(numAmount);
        setPrice(tokenAmount.toFixed(6)); // USDT/BUSD amount with 6 decimals
      }
    } else {
      setAmountNamo(0);
      setPrice("0.000000");
    }
  };

  // Restrict input to numbers only with decimal support
  const handleInputChange = (e, setter) => {
    const value = e.target.value;
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setter(value);
      if (setter === setAmountNamo) getTotalPrice(value);
    }
  };

  // Mint tokens based on selected cryptocurrency
  const mintToken = async () => {
    if (amountNamo <= 0) {
      toast.error("Input correct amount", {
        toastId: 'invalid-amount',
      });
      return;
    }

    if (!contract || !signer) {
      toast.error("Please connect your wallet first.", {
        toastId: 'wallet-not-connected',
      });
      return;
    }

    // Check if the network is supported
    if (!chain || (chain.id !== 56 && chain.id !== 97)) {
      toast.error("Please switch to BNB Mainnet or Testnet to mint tokens.", {
        toastId: 'wrong-network-mint',
      });
      return;
    }

    setLoading(true);
    try {
      const tokenAmount = ethers.utils.parseUnits(amountNamo.toString(), 18);

      if (crypto.name === "BNB") {
        const bnbAmount = ethers.utils.parseUnits(price.toString(), 18);
        const tx = await contract.mintWithBNB({ value: bnbAmount });
        await tx.wait();
        toast.success(`Successfully minted ${amountNamo} NAMO with BNB!`, {
          toastId: 'mint-success-bnb',
        });
      } else {
        const tokenAddress = crypto.name === "USDT" ? await contract.usdtToken() : await contract.busdToken();
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
        const decimals = await tokenContract.decimals(); // 18 for both USDT and BUSD on BSC
        const paymentAmount = ethers.utils.parseUnits(price.toString(), decimals); // Use price as token amount

        // Approve token spending
        const allowance = await tokenContract.allowance(await signer.getAddress(), NAMOCOIN_ADDRESS);
        if (allowance.lt(paymentAmount)) {
          const approveTx = await tokenContract.approve(NAMOCOIN_ADDRESS, paymentAmount);
          await approveTx.wait();
          toast.info(`Approved ${crypto.name} for spending.`, {
            toastId: 'approve-success',
          });
        }

        // Mint tokens
        const mintFunction = crypto.name === "USDT" ? "mintWithUSDT" : "mintWithBUSD";
        const tx = await contract[mintFunction](tokenAmount);
        await tx.wait();
        toast.success(`Successfully minted ${amountNamo} NAMO with ${crypto.name}!`, {
          toastId: 'mint-success-token',
        });
      }
    } catch (error) {
      console.error("Minting failed:", error);
      toast.error(`Minting failed: ${error.message}`, {
        toastId: 'mint-failed',
      });
    } finally {
      setLoading(false);
    }
  };

  const CryptoIcon = crypto.icon;

  return (
    <>
      <div className="bg-black text-white flex flex-wrap items-center justify-center pt-44 pb-48">
        <Card className="bg-zinc-900 text-white w-full max-w-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-4">Buy</h2>
            <div className="bg-zinc-800 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-2 items-center">
                  <img src="./assets/logo.png" alt="NAMO" className="w-6 h-6" />
                  <span>NAMO</span>
                </div>
              </div>
              <Input
                className="bg-zinc-700 text-white"
                value={amountNamo}
                onChange={(e) => handleInputChange(e, setAmountNamo)}
                placeholder="0.0"
              />
            </div>
            <div className="flex justify-center my-2">
              <Repeat className="text-zinc-400" />
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-2 items-center w-72">
                  <CryptoIcon
                    size={20}
                    color={
                      crypto.name === "BNB"
                        ? "#F0B90B"
                        : crypto.name === "USDT"
                        ? "#26A17B"
                        : "#F0B90B" // BUSD
                    }
                  />
                  <select
                    value={crypto.name}
                    onChange={handleCryptoSelect}
                    className="bg-zinc-800 text-white border-none outline-none"
                  >
                    <option value="BNB">BNB</option>
                    <option value="USDT">USDT</option>
                    <option value="BUSD">BUSD</option>
                  </select>
                </div>
              </div>
              <Input
                className="bg-zinc-700 text-white"
                value={price}
                onChange={(e) => handleInputChange(e, setAmountBNB)}
                disabled
                placeholder="0.00"
              />
            </div>
            {isConnected ? (
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-black"
                onClick={mintToken}
                disabled={loading}
              >
                {loading ? "Minting..." : "Buy"}
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-black"
                  onClick={() => setIsModalOpen(true)}
                >
                  Connect Wallet
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <footer className="w-full text-center text-sm text-zinc-500 p-[1.5rem] border-t border-zinc-800 bg-black">
        <p className="mt-1">Copyright © 2025 NamoToken</p>
      </footer>
      <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
    </>
  );
}