import { createContext, useContext, useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { NAMOCOIN_ABI, NAMOCOIN_ADDRESS } from '../config/contract';

const ContractContext = createContext();

export function ContractProvider({ children }) {
  const [tokenPrice, setTokenPrice] = useState(null);

  const { data: contractPrice, isLoading, isError } = useReadContract({
    address: NAMOCOIN_ADDRESS,
    abi: NAMOCOIN_ABI,
    functionName: 'tokenPrice',
  });

  useEffect(() => {
    if (contractPrice && !isLoading && !isError) {
      const priceInWei = BigInt(contractPrice); // Ensure BigInt is recognized (ESLint fixed)
      const priceInEther = Number(priceInWei) / 10 ** 18; // Assuming 18 decimals
      setTokenPrice(priceInEther.toFixed(5));
    } else if (isError) {
      console.error('Error fetching token price:', isError);
      setTokenPrice(null);
    }
  }, [contractPrice, isLoading, isError]);

  return (
    <ContractContext.Provider value={{ tokenPrice, isLoading, isError }}>
      {children}
    </ContractContext.Provider>
  );
}

export const useContract = () => useContext(ContractContext);