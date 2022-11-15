import React, { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";

import { Input, Button } from "../styles/styles";
import { FormContainer } from "./layout/FormContainer";

export const CreateToken = () => {
  const [formInput, updateFormInput] = useState({
    name: "",
    symbol: "",
    initialSupply: 0,
  });

  const createERC20Token = async () => {};

  return (
    <FormContainer title="Create your own ERC 20 token">
      <Input
        type="text"
        placeholder="Token Name"
        onChange={(e) =>
          updateFormInput({ ...formInput, name: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Token Symbol"
        onChange={(e) =>
          updateFormInput({ ...formInput, symbol: e.target.value })
        }
      />
      <Input
        type="number"
        placeholder="Initial Supply"
        onChange={(e) =>
          updateFormInput({ ...formInput, initialSupply: e.target.value })
        }
      />
      <Button onClick={createERC20Token}>Create Token</Button>
    </FormContainer>
  );
};
