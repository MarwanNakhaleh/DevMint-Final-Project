import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const Contract = ({ contractAddress, contractAbi, provider }) => {
  const [connected, setConnected] = useState(false);
  const [contractDetails, setContractDetails] = useState();
  async function retrieveContractInfo() {
    if (window.ethereum) {
      setConnected(true);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      setConnected(true);
      const contractOwner = await contract.contractOwner();
      const network = provider.network["chainId"] === 1337 ? "localhost" : provider.network["name"]
      setContractDetails({
        owner: contractOwner,
        network: network
      });

    }
  }
  useEffect(() => {
    retrieveContractInfo();
  });

  return (
    <div>
      <h1>Auction</h1>
      <p></p>
      {(connected && provider && contractDetails) ? (
        <div>
          <p>Contract Address: {contractAddress}</p>
          <p>Contract Owner: {contractDetails["owner"]}</p>
          <p>Connected Network: {provider.network["chainId"] === 1337 ? "localhost" : provider.network["name"]}</p>
          <button>Bid!</button>
        </div>
      ) : (
        <p>You must be connected to bid on an auction.</p>
      )}
    </div>
  );
};

export default Contract;
