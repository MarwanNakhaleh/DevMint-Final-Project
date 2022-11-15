import React from "react";

import { Link } from "@mui/material";
import {
  StyledBox,
  StyledGrid,
  StyledText,
  StyledLink,
} from "../styles/content";

export const StartHere = () => {
  return (
    <StyledBox>
      <StyledGrid container>
        <StyledText
          variant="h3"
          fontWeight={700}
          style={{ paddingBottom: "15px" }}
        >
          Table of Contents
        </StyledText>
        <StyledLink>
          <Link href="/what-is-web3" underline="none">
            What is Web3?
          </Link>
        </StyledLink>
        <StyledLink>
          <Link href="/why-does-web3-matter" underline="none">
            Why does Web3 matter?
          </Link>
        </StyledLink>
        <StyledLink>
          <Link href="/how-to-start" underline="none">
            How do you get into Web3?
          </Link>
        </StyledLink>
        <StyledText
          variant="h4"
          fontWeight={700}
          style={{ paddingBottom: "15px" }}
        >
          Who is this for?
        </StyledText>
        <StyledText>
          This is for businesses that want to get a quick start into the NFT
          world. Build collectible items, memberships, access passes, and so
          much more on the blockchain!
        </StyledText>
        <StyledText
          variant="h4"
          fontWeight={700}
          style={{ paddingBottom: "15px" }}
        >
          What do you gain from this?
        </StyledText>
        <StyledText
          variant="h5"
          style={{ width: "100%", paddingBottom: "15px" }}
        >
          Sell membership and access
        </StyledText>
        <StyledText>
          NFTs aren't just for overpriced pictures of monkeys. They can
          represent any tangible or intangible asset. A popular use case for
          NFTs is to provide access and membership to exclusive clubs, events,
          and more.
        </StyledText>
        <StyledText>
          An NFT can provide a one-of-a-kind way to represent every person and
          their unique access to your services and offerings.
        </StyledText>
        <StyledText
          variant="h5"
          style={{ width: "100%", paddingBottom: "15px" }}
        >
          Spread brand awareness
        </StyledText>
        <StyledText>
          NFTs are hip and trendy these days, and having a collectible set can
          be a great way to show that your business is up-to-date with
          cutting-edge technology and can speak to a younger, more tech-savvy
          audience.
        </StyledText>
        <StyledText>
          NFTs are made with images and metadata metadata, along with the rules
          dictated by the creating smart contract for how they should be
          transferred or purchased. While all the logic sits inside metadata and
          on the blockchain, your customers can use the pictures denoting their
          unique NFTs as avatars to express themselves through your brand.
        </StyledText>
        <StyledText
          variant="h5"
          style={{ width: "100%", paddingBottom: "15px" }}
        >
          Build new revenue models
        </StyledText>
        <StyledText>
          The blockchain opens up new ways to create, own, and transfer assets.
          Therefore, it also introduces new revenue models. NFTs can be used to
          represent any asset, even tangible items like vehicles or homes. When
          you use a smart contract to create an NFT that represents some kind of
          asset, you can make money on its creation, sale, and transfer. Since
          your business creates the NFT, you can take a cut from any movement or
          modification of the digital asset.
        </StyledText>
      </StyledGrid>
    </StyledBox>
  );
};
