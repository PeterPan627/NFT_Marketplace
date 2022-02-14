import React from "react";
import GlobalStyle from "./styles/global";
import Navbar from "./components/Navbar";
import Marketplace from "./pages/Marketplace";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Navbar />
      <Marketplace />
    </div>
  );
}

export default App;
