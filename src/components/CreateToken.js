import React, { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";

import { FormContainer, Form, Input, Button } from "../styles/styles";
import { StyledBox, StyledGrid, StyledText } from "../styles/content";

export const CreateToken = () => {
  const [formInput, updateFormInput] = useState({
    name: "",
    symbol: "",
    initialSupply: 0,
  });

  const createERC20Token = async () => {};

  return (
    <>
      <StyledBox>
        <StyledGrid container>
          <StyledText
            variant="h3"
            fontWeight={700}
            style={{ paddingBottom: "15px"}}
          >
            Create your own ERC 20 token!
          </StyledText>
        </StyledGrid>
      </StyledBox>
      <FormContainer>
        <Form>
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
          <Button
            onClick={createERC20Token}
            className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
          >
            Create Token
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};
