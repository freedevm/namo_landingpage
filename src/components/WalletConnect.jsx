import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { utils } from 'ethers';
// import { useAccount, useConnect, useDisconnect } from 'wagmi';
// import { InjectedConnector } from 'wagmi/connectors/injected';

const WalletConnect = ({active, setActive}) => {
  // const { address, isConnected } = useAccount();
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });
  // const { disconnect } = useDisconnect();

  // if (isConnected)
  //   return (
  //     <div>
  //       Connected to {address}
  //       <button onClick={() => disconnect()}>Disconnect</button>
  //     </div>
  //   );

  // return <button onClick={() => connect()}>Connect Wallet</button>;
  const { formatEther } = utils;
  const [account, setAccount] = useState("");
  const [data, setdata] = useState({
        address: "",
        Balance: null,
    });
  const btnhandler = () => {
        // Asking if metamask is already present or not
        if (window.ethereum) {
            // res[0] for fetching a first wallet
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) =>
                    accountChangeHandler(res[0])
                );
        } else {
            alert("install metamask extension!!");
        }
    };
   const getbalance = (address) => {
        // Requesting balance method
      
        window.ethereum
            .request({
                method: "eth_getBalance",
                params: [address, "latest"],
            })
            .then((balance) => {
                // Setting balance
                setdata({
                    Balance:formatEther(balance),
                });
            });
    };

    // Function for getting handling all events
    const accountChangeHandler = (account) => {
        // Setting an address data
        setdata({
            address: account,
        });
        setActive(true)
        // Setting a balance
        getbalance(account);
    };
  return (
    <button onClick={btnhandler} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded-xl">
      {active ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
    </button>
  );
};

export default WalletConnect;
