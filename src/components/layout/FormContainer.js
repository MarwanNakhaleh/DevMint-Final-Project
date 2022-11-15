import React from "react";
import { StyledBox, StyledGrid, StyledText } from "../../styles/content";

export const FormContainer = ({ title, children }) => {
  return (
    <StyledBox>
      <StyledGrid container>
        <StyledText
          variant="h3"
          fontWeight={700}
          style={{
            paddingBottom: "15px",
            display: "flex",
          }}
        >
          {title}
        </StyledText>
        {children}
      </StyledGrid>
    </StyledBox>
  );
};
