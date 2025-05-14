// wagmi.ts
import { createConfig, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: () => ({
        http: 'https://mainnet.infura.io/v3/YOUR_INFURA_ID',
      }),
    }),
  ]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});
