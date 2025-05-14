import { useEffect, useState } from "react";
import { ethers } from "ethers";
// import NAMOTokenABI from "../contracts/NAMOTokenABI.json";

const tokenAddress = "0xYourNAMOTokenAddress"; // replace with deployed address

const TokenStats = ({ provider }) => {
  const [burned, setBurned] = useState("0");
  const [supply, setSupply] = useState("0");

  useEffect(() => {
    if (!provider) return;
    const load = async () => {
      // const contract = new ethers.Contract(tokenAddress, NAMOTokenABI, provider);
      // const totalSupply = await contract.totalSupply();
      // const burnedBalance = await contract.balanceOf("0x000000000000000000000000000000000000dEaD");
      // setSupply(ethers.utils.formatUnits(totalSupply, 18));
      // setBurned(ethers.utils.formatUnits(burnedBalance, 18));
    };
    load();
  }, [provider]);

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold">Token Stats</h2>
      <p>Total Supply: {supply} $NAMO</p>
      <p>Burned: {burned} $NAMO</p>
    </div>
  );
};

export default TokenStats;
