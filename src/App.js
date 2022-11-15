import React from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { app_theme } from "./styles/theme";

import { CreateSFT } from "./components/CreateSFT";
import { CreateNFT } from "./components/CreateNFT";
import { CreateToken } from "./components/CreateToken";
import { HowToUse } from "./components/HowToUse";
import { StartHere } from "./components/StartHere";
import { WhatIsWeb3 } from "./components/education/WhatIsWeb3";
import { WhyDoesWeb3Matter } from "./components/education/WhyDoesWeb3Matter";
import { HowDoYouStart } from "./components/education/HowDoYouStart";

const theme = createTheme(app_theme);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartHere />} />
          <Route path="/how" element={<HowToUse />} />
          <Route path="/erc20" element={<CreateToken />} />
          <Route path="/erc721" element={<CreateNFT />} />
          <Route path="/erc1155" element={<CreateSFT />} />
          {/* educational material */}
          <Route path="/what-is-web3" element={<WhatIsWeb3 />} />
          <Route path="/why-does-web3-matter" element={<WhyDoesWeb3Matter />} />
          <Route path="/how-to-start" element={<HowDoYouStart />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
