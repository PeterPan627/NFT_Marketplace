import React, { useState, useCallback } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import { NoBscProviderError } from "@binance-chain/bsc-connector";
import { WalletInfos, ConnectorNames, connectorsByName } from "../../Constants";
import useComponentVisible from "../../hooks/useComponentVisible";

import {
  Container,
  Logo,
  Menu,
  MenuItem,
  ConnectWalletButton,
  MenuWrapper,
  StyledModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  WalletItem,
  ModalFooter,
  AccountInfoWrapper,
  AccountContainer,
  AccountDetail,
  AccountDetailTitle,
  AccountDetailAddress,
} from "./styled";

const Navbar: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { activate, deactivate, account } = useWeb3React();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const modalCustomStyles = {
    overlay: {
      background: "rgb(0 0 0 / 50%)",
      transition: "opacity 0.15s linear",
    },
  };

  const shortenString = (string: string, length: number) => {
    const halfLength = Math.floor(length / 2);
    return string.length < length
      ? string
      : `${string.slice(0, halfLength)}...${string.slice(-halfLength)}`;
  };

  const handleClickWalletItem = useCallback(
    (connectorId: ConnectorNames) => {
      setModalIsOpen(false);
      console.log(connectorId);
      const connector = connectorsByName[connectorId];
      console.log("connector", connector);
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            // const hasSetup = await setupNetwork();
            // if (hasSetup) {
            //   activate(connector);
            // }
            console.error("UnsupportedChainIdError", error);
          } else {
            window.localStorage.removeItem("connectorId");
            if (
              error instanceof NoEthereumProviderError ||
              error instanceof NoBscProviderError
            ) {
              console.error("Provider Error", "No Provider was found");
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector;
                walletConnector.walletConnectProvider = null;
              }
              console.error(
                "Authorization Error",
                "Please authorize to access your account"
              );
            } else {
              console.error("UnexpectedError", error.name, error.message);
            }
          }
        });
      } else {
        console.error(
          "Unable to find connector",
          "The connector config is wrong"
        );
      }
    },
    [activate]
  );

  console.log("account", account);

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
                onClick={() => navigator.clipboard.writeText(account)}
              >
                {shortenString(account, 30)}
                <i className="fa-solid fa-clone" />
              </AccountDetailAddress>
              <AccountDetailTitle>Balance</AccountDetailTitle>
            </AccountDetail>
          </AccountInfoWrapper>
        ) : (
          <ConnectWalletButton onClick={() => setModalIsOpen(true)}>
            CONNECT WALLET
          </ConnectWalletButton>
        )}
      </Container>
      <StyledModal
        isOpen={modalIsOpen}
        style={modalCustomStyles}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <ModalContent>
          <ModalHeader>
            <div>Connect Wallet</div>
            <button onClick={() => setModalIsOpen(false)}>
              <i className="fa-solid fa-xmark" />
            </button>
          </ModalHeader>
          <ModalBody>
            <div>
              {WalletInfos.map((walletItem, walletIndex) => {
                return (
                  <WalletItem
                    key={walletIndex}
                    onClick={() => {
                      handleClickWalletItem(walletItem.connectorId);
                    }}
                  >
                    <button>
                      <img src={walletItem.icon} alt="" />
                      <span>{walletItem.title}</span>
                    </button>
                  </WalletItem>
                );
              })}
            </div>
          </ModalBody>
          <ModalFooter>
            <div>
              <p>Haven't got a crypto wallet yet?</p>
              <button>Learn How to Connect</button>
            </div>
          </ModalFooter>
        </ModalContent>
      </StyledModal>
    </>
  );
};

export default Navbar;
