import React, { useState } from "react";
import {ethers} from "ethers";
import Web3Modal from "web3modal";

const ConnectToNetwork = ({ setParentProvider }) => {
    const [connected, setConnected] = useState(false);
    const web3modal = new Web3Modal();
    
    async function connectToWallet() {
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      setParentProvider(provider);
      setConnected(true)
    }

    async function disconnectFromWallet() {
      web3modal.clearCachedProvider();
      window.localStorage.clear();
      setParentProvider(null);
      setConnected(false);
    }

    return (
        <div>
          {connected ? (
            <div>
              <button onClick={disconnectFromWallet}>Disconnect</button>
            </div>
          ) : (
            <div>
              <button onClick={connectToWallet}>Connect</button>
            </div>
          )}
        </div>
      );
};

export default ConnectToNetwork;
