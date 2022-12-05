import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";

import { Input, Button, Dropdown } from "../styles/styles";
import { FormContainer } from "./layout/FormContainer";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export const CreateSFT = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [numberOfSFTs, setNumberOfSFTs] = useState(0);
  const [formInput, updateFormInput] = useState({
    tokenAddress: "",
  });
  const [token1, setToken1] = useState({
    id: 0,
    supply: 0,
    name: "",
  });
  const [token2, setToken2] = useState({
    id: 0,
    supply: 0,
    name: "",
  });
  const [token3, setToken3] = useState({
    id: 0,
    supply: 0,
    name: "",
  });

  async function onFormChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function uploadToIPFS() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function listSFTForSale() {
    const url = await uploadToIPFS();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, "ether");
    // let contract = new ethers.Contract(marketplaceAddress, SFTMarketplace.abi, signer)
    // let listingPrice = await contract.getListingPrice()
    // listingPrice = listingPrice.toString()
    // let transaction = await contract.createToken(url, price, { value: listingPrice })
    // await transaction.wait();
  }

  function setTokenInformation(i, event, typeOfValue) {
    switch (i) {
      case 1:
        setToken1({ ...token1, [typeOfValue]: event.target.value });
        break;
      case 2:
        setToken2({ ...token2, [typeOfValue]: event.target.value });
        break;
      case 3:
        setToken3({ ...token3, [typeOfValue]: event.target.value });
        break;
      default:
        break;
    }
  }

  function allowInputsForNumberOfSFTs() {
    let tokenInputs = [];
    for (let i = 1; i <= numberOfSFTs; i++) {
      tokenInputs.push(
        <>
          <Input
            type="number"
            placeholder={`Asset ${i} ID`}
            onChange={(e) => setTokenInformation(i, e, "id")}
          />
          <Input
            type="text"
            placeholder={`Asset ${i} Name`}
            onChange={(e) => setTokenInformation(i, e, "name")}
          />
          <Input
            type="number"
            placeholder={`Asset ${i} Supply`}
            onChange={(e) => setTokenInformation(i, e, "supply")}
          />
        </>
      );
    }
    return tokenInputs;
  }

  return (
    <FormContainer title="Create your own ERC 1155 token">
      <Input
        type="text"
        placeholder="Contract Address for Token"
        onChange={(e) =>
          updateFormInput({ ...formInput, name: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Asset Name"
        onChange={(e) =>
          updateFormInput({ ...formInput, name: e.target.value })
        }
      />
      <Input
        type="textarea"
        placeholder="Asset Description"
        onChange={(e) =>
          updateFormInput({ ...formInput, description: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Asset Price in Number of Your Tokens"
        onChange={(e) =>
          updateFormInput({ ...formInput, price: e.target.value })
        }
      />
      <Dropdown onChange={(e) => setNumberOfSFTs(e.target.value)}>
        <option value="" hidden>
          How many tokens do you want?
        </option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </Dropdown>
      {allowInputsForNumberOfSFTs()}
      <Input type="file" name="Asset" />
      {fileUrl && <img className="" width="350" src={fileUrl} alt={fileUrl} />}
      <Button onClick={listSFTForSale}>Create SFT</Button>
    </FormContainer>
  );
};
