import React, { useContext, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { TokenPriceContext } from "../../pages/HomePage/index";
import ConnectWalletModal from "../ConnectWalletModal";
import {
  orderHero,
  cancelOrderHero,
  editHeroPrice,
  buyHero,
} from "../../utils/wallet";

import {
  BuyNowButton,
  CancelOrderButton,
  ConnectWalletButton,
  EditPriceButton,
  ItemOperationButtonWrapper,
  ItemPriceContainer,
  OperationButton,
  OrderButton,
  OwnerButtonGroup,
} from "./styled";

const ItemOperationButton: React.FC<{ hero: any; fetchHeroDetail: any }> = ({
  hero,
  fetchHeroDetail,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { account, library } = useWeb3React();
  const signer = library?.getSigner();

  const tokenPrice = useContext(TokenPriceContext);
  const bnbPrice = tokenPrice.BNB || {};

  const orderElpisHero = async (heroId: number) => {
    if (isLoading || !account) return;
    setIsLoading(true);
    await orderHero(heroId, signer, account);
    await fetchHeroDetail(heroId);
    setIsLoading(false);
  };

  const cancelOrderElpisHero = async (heroId: number) => {
    if (isLoading || !account) return;
    setIsLoading(true);
    try {
      await cancelOrderHero(heroId, signer, account);
      await fetchHeroDetail(heroId);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const editElpisHeroPrice = async (heroId: number) => {
    if (isLoading || !account) return;
    let inputedPrice = prompt("Please write your price(BNB).") || "empty";
    if (inputedPrice === "empty") return;
    const price = +inputedPrice;
    if (isNaN(price)) {
      alert("Price is in wrong type. Please try again.");
      return;
    }
    try {
      setIsLoading(true);
      await editHeroPrice(heroId, price, signer, account);
      await fetchHeroDetail(heroId);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const buyElpisHero = async (heroId: number) => {
    if (isLoading || !account) return;
    try {
      setIsLoading(true);
      buyHero(heroId, signer);
      await fetchHeroDetail(heroId);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ItemOperationButtonWrapper>
        <ItemPriceContainer>
          <span>
            <div>
              <img src="/assets/images/currency/binance-coin.png" alt="" />
              {hero.heroPrice / 10 ** 18} BNB
            </div>
            <small>{`~ $${
              (hero.heroPrice / 10 ** 18) * (bnbPrice.price || 1)
            }`}</small>
          </span>
        </ItemPriceContainer>
        <div>
          {!account && (
            <ConnectWalletButton>
              <OperationButton onClick={() => setModalIsOpen(true)}>
                Connect Wallet
              </OperationButton>
            </ConnectWalletButton>
          )}
          {!!account && hero.ownerAddress === account && (
            <OwnerButtonGroup>
              {hero.status === "Cancelled" && (
                <OrderButton onClick={() => orderElpisHero(hero.elpisHeroId)}>
                  Order
                </OrderButton>
              )}
              {hero.status === "Open" && (
                <CancelOrderButton
                  onClick={() => cancelOrderElpisHero(hero.elpisHeroId)}
                >
                  Cancel order
                </CancelOrderButton>
              )}
              <EditPriceButton
                onClick={() => editElpisHeroPrice(hero.elpisHeroId)}
              >
                Edit Price
              </EditPriceButton>
            </OwnerButtonGroup>
          )}
          {!!account &&
            hero.ownerAddress !== account &&
            hero.status === "Open" && (
              <BuyNowButton>
                <OperationButton onClick={() => buyElpisHero(hero.elpisHeroId)}>
                  Buy Now
                </OperationButton>
              </BuyNowButton>
            )}
        </div>
      </ItemOperationButtonWrapper>
      <ConnectWalletModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </>
  );
};

export default ItemOperationButton;
