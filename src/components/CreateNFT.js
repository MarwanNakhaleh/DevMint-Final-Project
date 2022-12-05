import React, { useEffect, useState } from "react";

import { create } from "ipfs-http-client";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { Buffer } from "buffer";

import { Input, Button } from "../styles/styles";
import { FormContainer } from "./layout/FormContainer";

const auth =
  "Basic " +
  Buffer.from(
    process.env.INFURA_PROJECT_ID + ":" + process.env.INFURA_PROJECT_SECRET
  ).toString("base64");

// https://ipfs.infura.io:5001
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const CreateNFT = () => {
  useEffect(() => {
    console.log(process.env.INFURA_PROJECT_ID);
  });

  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  async function onFileSelection(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log("IPFS file URL: " + url);
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

  const listNFTOnMarket = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const url = await uploadToIPFS();
    console.log("IPFS URL: " + url);
  };

  return (
    <FormContainer title="Create your own ERC 721 token">
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
        placeholder="Asset Price in ETH"
        onChange={(e) =>
          updateFormInput({ ...formInput, price: e.target.value })
        }
      />
      <Input
        type="file"
        accept="image/png, image/jpeg"
        name="Asset"
        onChange={onFileSelection}
      />
      {fileUrl && <img className="" width="350" src={fileUrl} alt={fileUrl} />}
      <Button onClick={listNFTOnMarket}>Create NFT</Button>
    </FormContainer>
  );
};
