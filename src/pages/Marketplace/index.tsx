import React, { useState, useEffect, createContext } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
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

const TITLES: { [key: string]: string } = {
  "/heros": "MARKETPLACE",
  "/equipments": "MARKETPLACE",
  "/hero": "HERO DETAIL",
  "/equipment": "EQUIPMENT DETAIL",
};

const Marketplace: React.FC = () => {
  const [tokenPrice, setTokenPrice] = useState({});
  const location = useLocation();
  const pathname: string = location.pathname || "";

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
      <TokenPriceContext.Provider value={tokenPrice}>
        <BannerImage />
        <BannerFeet>
          <BannerFeetLabel>{TITLES[pathname] || "MARKETPLACE"}</BannerFeetLabel>
        </BannerFeet>
        <Contents>
          <Navbar />
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
        </Contents>
      </TokenPriceContext.Provider>
    </>
  );
};

export default Marketplace;
