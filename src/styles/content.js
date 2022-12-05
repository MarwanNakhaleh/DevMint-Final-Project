import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledBox = styled(({ className, ...other }) => (
  <Box
    style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "30px 0px 50px 0px",
    }}
    {...other}
  />
))``;

const StyledGrid = styled(({ className, ...other }) => (
  <Grid
    style={{
      display: "flex",
      alignItems: "center",
      maxWidth: "1300px",
      padding: "50px",
      flexDirection: "row",
    }}
    {...other}
  />
))``;

const StyledLink = styled(({ className, ...other }) => (
  <Typography
    style={{
      opacity: "0.7",
      marginBottom: "10px",
      fontSize: "18px",
      flex: "0 0 100%",
    }}
    {...other}
  />
))``;

const StyledText = styled(({ className, ...other }) => (
  <Typography
    style={{
      opacity: "0.7",
      paddingBottom: "30px",
      fontSize: "18px",
      flex: "0 0 100%",
    }}
    {...other}
  />
))``;

export { StyledBox, StyledGrid, StyledText, StyledLink };
