import React from "react";
import {CssBaseline} from "@mui/material";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Header from "./components/Header";

import { CreateSFT } from "./components/CreateSFT";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },});


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <CssBaseline />
      <CreateSFT />
    </ThemeProvider>
  );
};

export default App;
