import React from "react";

import { StyledBox, StyledGrid, StyledText } from "../styles/content";

export const HowToUse = () => {
  return (
    <StyledBox>
      <StyledGrid container>
        <StyledText
          variant="h3"
          fontWeight={700}
          style={{ paddingBottom: "15px" }}
        >
          How do I use this?
        </StyledText>
        <StyledText>Let's say</StyledText>
        <StyledText>You can do it</StyledText>
      </StyledGrid>
    </StyledBox>
  );
};
