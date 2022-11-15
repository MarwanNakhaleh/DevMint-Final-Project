import React from "react";

import { StyledBox, StyledGrid, StyledText } from "../../styles/content";

import { Link } from "@mui/material";

export const HowDoYouStart = () => {
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
          How can you start?
        </StyledText>
        <StyledText>
          Right now, the use cases of blockchain are limited, but growing.
          Digital assets and decentralized finance are two of the biggest
          current use cases for Web3.
        </StyledText>
        <StyledText>
          As a business, before you get into Web3, you have to decide first that
          the data with which you interact (or intend to interact) will actually
          benefit from utilizing the blockchain. Blockchain is very useful for
          transactions that require high trust, fast transfers, and irreversible
          interactions. It's also incredibly powerful if you need maximum data
          integrity. For example, if you want to verify that an employee has
          completed a certification course, you can provide their blockchain
          wallet address with a non-fungible token or semi-fungible token that
          symbolizes their completion of the course in a very secure, verifiable
          manner.
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
          Once you've decided that the blockchain is overall better than
          centralized web for your data, make a Web2 prototype. Your in-house
          developers should be able to spin up a proof-of-concept pretty
          quickly. You may not be able to mimic the blockchain magic, but you
          can at least put something that mimics most of the user experience in
          front of potential users to test your idea.
        </StyledText>
        <StyledText>
          When you have the blockchain expertise ready, whether through training
          your existing staff or bringing on consultants or new hires, you can
          write up the smart contracts that will fulfill the needs of your
          applications. Since code on the blockchain is all public, you can
          actually get inexpensive penetration testing on your smart contracts
          by putting them online in front of blockchain communities and asking
          for feedback. Of course, don't do this with a smart contract that is
          live on the mainnet. There aren't any trade secrets to steal, but if
          you have a smart contract deployed on a test network, you can easily
          ask for feedback.
        </StyledText>
        <StyledText>
          Right now, the biggest social media platforms used by blockchain
          experts include Discord, Twitter, and Telegram. Don't let these less
          business-focused platforms scare you! The blockchain knowledge
          communities congregate and interact largely on these platforms.
          LinkedIn will not be nearly as helpful as you may think.
        </StyledText>
        <StyledText>
          Web3 is decentralized by nature. Therefore, the avenues of entry will
          be more scattered and less clear-cut than those for Web1 or Web2. The
          initial investment may be large, but you are still very early in this
          industry. The inception of blockchain technology is younger than
          modern cloud computing, which required decades of computing advances
          to become feasible. Imagine the heights your organization can reach in
          a few years.
        </StyledText>
      </StyledGrid>
    </StyledBox>
  );
};
