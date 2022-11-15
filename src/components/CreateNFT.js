import React, { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { Input, Button } from "../styles/styles";
import { StyledBox, StyledGrid, StyledText } from "../styles/content";
import { FormContainer } from "./layout/FormContainer";

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
        placeholder="Asset Price in Eth"
        onChange={(e) =>
          updateFormInput({ ...formInput, price: e.target.value })
        }
      />
      <Input type="file" name="Asset" />
      {fileUrl && <img className="" width="350" src={fileUrl} alt={fileUrl} />}
      <Button>Create NFT</Button>
    </FormContainer>
  );
};
