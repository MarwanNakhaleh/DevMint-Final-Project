import React from "react";

import { StyledBox, StyledGrid, StyledText } from "../../styles/content";

import { Link } from "@mui/material";

export const WhyDoesWeb3Matter = () => {
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
          Why does Web3 matter?
        </StyledText>
        <StyledText>
          Since the beginning of the internet, we have gained so much in what we
          can accomplish and experience. However, there are plenty of bad actors
          that can easily spoof identities. There are also many situations in
          which two (or more) parties can attempt to complete an exchange and
          someone can maliciously tamper with the exchange. In addition, even
          the biggest cloud computing providers (centralized entities) can go
          down due to one individual mistake, and any applications residing in
          those providers will be unusable until service is restored.
        </StyledText>
        <StyledText>
          Simply put, Web3 matters because it provides a new way of interacting
          with data and transactions that's more trustworthy, secure, robust,
          transparent, and efficient than existing solutions.
        </StyledText>
        <StyledText>
          Blockchain data is publicly viewable. Anyone can view any transaction
          between different blockchain wallet addresses. Therefore, at least
          with current technology, nothing should be moved within the blockchain
          that has to be private. In the future, there will likely be more
          technology to make individual data pieces private, but the
          functionality and the wallets interacting with the blockchain are
          publicly viewable.
        </StyledText>
        <StyledText>
          Modern use cases may seem scammy, but the underlying technology can
          power better ways to transact and verify data. At the time of this
          writing, much of the activity around NFTs involves digital are and
          attempting to flip the tokens for profit. However, the technology
          behind a non-fungible token can be used to prove ownership of any
          digital asset. Use cases of NFTs include memberships, access, and
          digital representations of items.
        </StyledText>
      </StyledGrid>
    </StyledBox>
  );
};
