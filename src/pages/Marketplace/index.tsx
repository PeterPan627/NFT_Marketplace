import React, { useState, useEffect, createContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { GraphQueryUrls } from "../../Constants";
import { sendRequestByGraphQl } from "../../utils/fetch";

import { Navbar } from "./components";
import {
  AllHeros,
  AllEquipments,
  HeroDetail,
  EquipmentDetail,
} from "./components";

import {
  BannerImage,
  BannerFeet,
  BannerFeetLabel,
  Contents,
  ContentsContainer,
} from "./styled";

export const TokenPriceContext = createContext<{ [key: string]: any }>({});

const Marketplace: React.FC = () => {
  const [tokenPrice, setTokenPrice] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await sendRequestByGraphQl({
        query: GraphQueryUrls.tokenPrice,
        variables: {},
      });
      const fetchedPriceData = fetchedData.data?.tokenPrice || [];
      let tokenPriceData: any = {};
      fetchedPriceData.map(
        (price: any) => (tokenPriceData[price.symbol] = price)
      );
      setTokenPrice(tokenPriceData);
    };
    fetchData();
  }, []);

  return (
    <>
      <BannerImage />
      <BannerFeet>
        <BannerFeetLabel>MARKETPLACE</BannerFeetLabel>
      </BannerFeet>
      <Contents>
        <Navbar />
        <TokenPriceContext.Provider value={tokenPrice}>
          <ContentsContainer>
            <Switch>
              <Route exact strict path="/heros" component={AllHeros} />
              <Route
                exact
                strict
                path="/equipments"
                component={AllEquipments}
              />
              <Route exact strict path="/hero" component={HeroDetail} />
              <Route
                exact
                strict
                path="/equipment"
                component={EquipmentDetail}
              />
              <Redirect to="/heros" />
            </Switch>
          </ContentsContainer>
        </TokenPriceContext.Provider>
      </Contents>
    </>
  );
};

export default Marketplace;
