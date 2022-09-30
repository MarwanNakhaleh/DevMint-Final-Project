import React, {useState} from "react";
import './App.css';
import Contract from './components/Contract';
import ConnectToNetwork from './components/ConnectToNetwork';
import contractAbi from "./contracts/Auction.json";

function App() {
  const [provider, setProvider] = useState();
  return (
    <div className="App">
      <h1>NFT Auction</h1>
      <p>Connect your wallet and bid on NFTs!</p>
      <ConnectToNetwork setParentProvider={setProvider} />
      {provider && <Contract contractAddress="0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6" contractAbi={contractAbi.abi} provider={provider}/>}
    </div>
  );
}

export default App;
