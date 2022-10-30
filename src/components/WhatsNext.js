import React from "react";

import {StyledBox, StyledGrid, StyledText} from "../styles/content";


export const WhatsNext = () => {

  return (
    <StyledBox>
      <StyledGrid container>
          <StyledText variant="h3" fontWeight={700} style={{paddingBottom: '15px'}}>
            What's next?
          </StyledText>
          <StyledText>
            Integrate it into your new smart contract
          </StyledText>
          <StyledText>
            You can do it
          </StyledText>
      </StyledGrid>
    </StyledBox>
  );
};
