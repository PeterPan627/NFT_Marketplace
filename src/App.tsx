import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import GlobalStyle from "./styles/global";
import Navbar from "./components/Navbar";
import Marketplace from "./pages/Marketplace";

const history = createBrowserHistory();

function App() {
  const getLibrary = (provider: any): ethers.providers.Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router history={history}>
        <div className="App">
          <GlobalStyle />
          <Navbar />
          <Marketplace />
        </div>
      </Router>
    </Web3ReactProvider>
  );
}

export default App;
