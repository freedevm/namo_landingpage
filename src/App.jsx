import { useState } from 'react';
import BuyNAMO from './components/BuyNAMO';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './config/wagmi';
import { ContractProvider } from './context/ContractContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ContractProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/buy" element={<BuyNAMO />} />             
              </Routes>
            </Router>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
          </ContractProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default App;