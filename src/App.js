import React from "react";
import {CssBaseline} from "@mui/material";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Header from "./components/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import { CreateSFT } from "./components/CreateSFT";
import { CreateNFT } from "./components/CreateNFT";
import { CreateToken } from "./components/CreateToken";
import { WhatsNext } from "./components/WhatsNext";
import { HowToUse } from "./components/HowToUse";

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
      <BrowserRouter>
        <Routes>
        <Route path="/howtouse" element={<HowToUse />} />
          <Route path="/erc20" element={<CreateToken />} />
          <Route path="/erc721" element={<CreateNFT />} />
          <Route path="/erc1155" element={<CreateSFT />} />
          <Route path="/nextsteps" element={<WhatsNext />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
