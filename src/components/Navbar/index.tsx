import React from "react";
import {
  Container,
  Logo,
  Menu,
  MenuItem,
  ConnectWalletButton,
  MenuWrapper,
} from "./styled";

const Navbar: React.FC = () => {
  return (
    <>
      <Container>
        <MenuWrapper>
          <Logo />
          <Menu>
            <MenuItem>HOME</MenuItem>
            <MenuItem>EARN</MenuItem>
            <MenuItem>PRIVATE BETA</MenuItem>
            <MenuItem>MARKETPLACE</MenuItem>
            <MenuItem>DOCUMENT</MenuItem>
            <MenuItem>CONTRACT ADDRESS</MenuItem>
          </Menu>
        </MenuWrapper>
        <ConnectWalletButton>CONNECT WALLET</ConnectWalletButton>
      </Container>
    </>
  );
};

export default Navbar;
