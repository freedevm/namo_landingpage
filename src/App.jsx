import { useState } from 'react';
import BuyNAMO from './components/BuyNAMO';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './config/wagmi';

const queryClient = new QueryClient();

function App() {
  const [active, setActive] = useState(false);

  return (
    <div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Navbar setActive={setActive} active={active} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/buy" element={<BuyNAMO active={active} />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default App;