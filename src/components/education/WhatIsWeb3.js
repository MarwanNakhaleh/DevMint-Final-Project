import React from "react";

import { StyledBox, StyledGrid, StyledText } from "../../styles/content";

import { Link } from "@mui/material";

export const WhatIsWeb3 = () => {
  return (
    <StyledBox>
      <StyledGrid container>
        <StyledText>
          <Link href="/" underline="none">
            Back to home
          </Link>
        </StyledText>
        <StyledText
          variant="h3"
          fontWeight={700}
          style={{ paddingBottom: "15px" }}
        >
          What is Web3?
        </StyledText>
        <StyledText>
          In a nutshell, Web3 is using web and mobile applications to power
          interactions between blockchain data and non-chain data. The
          blockchain is secure, unchangeable, and public, and smart contracts on
          the blockchain can theoretically do anything that other web
          applications can do.
        </StyledText>
        <StyledText>
          Once upon a time, the internet was only really usable for information
          lookup. People would create informational web pages to share concepts
          or provide business information. However, there wasn't really much of
          a way at all for internet users to interact with the data on the web.
          <i>This is Web1.</i>
        </StyledText>
        <StyledText>
          In the early 2000s, there was a major shift in the ways people would
          interact with the internet. Internet connections sped up
          significantly, and this helped with the rise of services like Youtube,
          Facebook, Reddit, and many more. The majority of web use shifted
          rather quickly from information lookup to interacting with others and
          creating content. The internet became more usable for communities of
          people. <i>This is Web2.</i>
        </StyledText>
        <StyledText>
          Now, we see an emergence of a decentralized, distributed internet.
          This method of interaction with the internet focuses on the individual
          and their needs. Now individuals, instead of having to remember a
          username and password for everything, can simply connect a blockchain
          wallet that they own and interact with the blockchain through a
          decentralized application. Digital trust, security, and data integrity
          are greatly enhanced by the blockchain.{" "}
          <i>
            <strong>This is Web3.</strong>
          </i>
        </StyledText>
        <StyledText>
          Like with Web2, any internet-connected computer can utilize Web3. All
          it needs is a way to provide a blockchain connection to a
          decentralized app or smart contract. The technology is, in theory,
          just as accessible as Web1 or Web2. However, users will be able to
          interact with data that they can trust is unchangeable, secure, and
          verifiable by decentralized sources.
        </StyledText>
        <StyledText>
          Not everything will be Web3 in the future. Some applications will
          benefit greatly from on-chain interactions, particularly those in
          which proof and trust is paramount. However, many applications will
          continue to operate in a Web2 paradigm, such as social media. Even
          these days, we still have many many Web1 websites that simply need to
          share information. Many brick-and-mortar businesses are perfectly fine
          just using Web1 for their internet presence.{" "}
        </StyledText>
      </StyledGrid>
    </StyledBox>
  );
};
