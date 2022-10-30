import React, { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";

import { FormContainer, Form, Input, Button } from "../styles/styles";
import { StyledText } from "../styles/content";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export const CreateNFT = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
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

  async function listNFTForSale() {
    const url = await uploadToIPFS();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, "ether");
    // let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    // let listingPrice = await contract.getListingPrice()
    // listingPrice = listingPrice.toString()
    // let transaction = await contract.createToken(url, price, { value: listingPrice })
    // await transaction.wait();
  }

  return (
    <>
      <StyledText
        variant="h3"
        fontWeight={700}
        style={{ paddingBottom: "15px", display: "block", textAlign: "center" }}
      >
        Create your own ERC 721 token!
      </StyledText>
      <FormContainer>
        <Form>
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
            placeholder="Asset Price in Eth"
            onChange={(e) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
          />
          <Input type="file" name="Asset" className="my-4" />
          {fileUrl && <img className="" width="350" src={fileUrl} />}
          <Button
            onClick={listNFTForSale}
            className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
          >
            Create NFT
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};
