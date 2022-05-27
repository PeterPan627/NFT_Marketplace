import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";

import { toast } from "react-toastify";

import useComponentVisible from "../../hooks/useComponentVisible";

import {
  Container,
  Logo,
  Menu,
  MenuItem,
  ConnectWalletButton,
  MenuWrapper,
  AccountInfoWrapper,
  AccountContainer,
  AccountDetail,
  AccountDetailTitle,
  AccountDetailAddress,
  AccountDetailBalanceWrapper,
  AccountDetailActionButton,
  AccountDetailDivider,
} from "./styled";
import ConnectWalletModal from "../ConnectWalletModal";

const Navbar: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let history = useHistory();
  const { account, deactivate } = useWeb3React();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const shortenString = (string: string, length: number) => {
    const halfLength = Math.floor(length / 2);
    return string.length < length
      ? string
      : `${string.slice(0, halfLength)}...${string.slice(-halfLength)}`;
  };

  return (
    <>
      <Container>
        <MenuWrapper>
          <Logo />
          <Menu>
            <MenuItem>HOME</MenuItem>
            <MenuItem>EARN</MenuItem>
            <MenuItem>PRIVATE BETA</MenuItem>
            <MenuItem onClick={() => history.push("/marketplace/heros")}>
              MARKETPLACE
            </MenuItem>
            <MenuItem>DOCUMENT</MenuItem>
            <MenuItem>CONTRACT ADDRESS</MenuItem>
          </Menu>
        </MenuWrapper>
        {account ? (
          <AccountInfoWrapper>
            <AccountContainer
              onClick={() => setIsComponentVisible(!isComponentVisible)}
            >
              <span>{shortenString(account, 12)}</span>
              <div>
                <i className="fa-solid fa-wallet" />
              </div>
            </AccountContainer>
            <AccountDetail ref={ref} visible={isComponentVisible}>
              <AccountDetailTitle>My Address</AccountDetailTitle>
              <AccountDetailAddress
                onClick={() => {
                  navigator.clipboard.writeText(account);
                  toast.success("Wallet address has been copied.");
                }}
              >
                {shortenString(account, 30)}
                <i className="fa-solid fa-clone" />
              </AccountDetailAddress>
              <AccountDetailTitle>Balance</AccountDetailTitle>
              <AccountDetailBalanceWrapper>
                <div>
                  <div>
                    <img src="/assets/images/currency/eba.png" alt="" />
                    <span>0 EBA</span>
                  </div>
                </div>
                <div>
                  <div>
                    <img src="/assets/images/currency/meg.png" alt="" />
                    <span>0 MEG</span>
                  </div>
                </div>
              </AccountDetailBalanceWrapper>
              <AccountDetailTitle>Actions</AccountDetailTitle>
              <AccountDetailActionButton
                onClick={() => history.push("/inventory")}
              >
                Inventory
              </AccountDetailActionButton>
              <AccountDetailDivider />
              <AccountDetailActionButton onClick={() => deactivate()}>
                Disconnect
              </AccountDetailActionButton>
            </AccountDetail>
          </AccountInfoWrapper>
        ) : (
          <ConnectWalletButton onClick={() => setModalIsOpen(true)}>
            CONNECT WALLET
          </ConnectWalletButton>
        )}
      </Container>
      <ConnectWalletModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </>
  );
};

export default Navbar;
