import React, { useCallback } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { ConnectorNames, connectorsByName, WalletInfos } from "../../constants";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import { NoBscProviderError } from "@binance-chain/bsc-connector";
import { toast } from "react-toastify";

import {
  StyledModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  WalletItem,
  ModalFooter,
} from "./styled";
import { setupNetwork } from "../../utils/wallet";

const ConnectWalletModal: React.FC<{
  modalIsOpen: boolean;
  setModalIsOpen: any;
}> = ({ modalIsOpen, setModalIsOpen }) => {
  const { activate } = useWeb3React();

  const modalCustomStyles = {
    overlay: {
      background: "rgb(0 0 0 / 50%)",
      transition: "opacity 0.15s linear",
    },
  };

  const handleClickWalletItem = useCallback(
    (connectorId: ConnectorNames) => {
      setModalIsOpen(false);
      const connector = connectorsByName[connectorId];
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork();
            if (hasSetup) {
              activate(connector);
            }
          } else {
            window.localStorage.removeItem("connectorId");
            if (
              error instanceof NoEthereumProviderError ||
              error instanceof NoBscProviderError
            ) {
              toast.error("Provider Error: No Provider was found");
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector;
                walletConnector.walletConnectProvider = null;
              }
              toast.error(
                "Authorization Error: Please authorize to access your account"
              );
            } else {
              console.error("UnexpectedError", error.name, error.message);
            }
          }
        });
      } else {
        toast.error("Unable to find connector: The connector config is wrong");
      }
    },
    [activate, setModalIsOpen]
  );

  return (
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
  );
};

export default ConnectWalletModal;
