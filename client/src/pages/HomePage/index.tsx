import React, { useState, useEffect, createContext } from "react";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { GraphQueryUrls } from "../../constants";
import { sendRequestByGraphQl } from "../../utils/fetch";
import Inventory from "../Inventory";
import Marketplace from "../Marketplace";

import { BannerImage, BannerFeet, BannerFeetLabel, Contents } from "./styled";

export const TokenPriceContext = createContext<{ [key: string]: any }>({});

const TITLES: { [key: string]: string } = {
  "/marketplace/heros": "MARKETPLACE",
  "/marketplace/equipments": "MARKETPLACE",
  "/marketplace/hero": "HERO DETAIL",
  "/marketplace/equipment": "EQUIPMENT DETAIL",
};

const HomePage: React.FC = () => {
  const [tokenPrice, setTokenPrice] = useState({});
  const location = useLocation();
  const pathname: string = location.pathname || "";

  useEffect(() => {
    // const fetchData = async () => {
    //   const fetchedData = await sendRequestByGraphQl({
    //     query: GraphQueryUrls.tokenPrice,
    //     variables: {},
    //   });
    //   const fetchedPriceData = fetchedData.data?.tokenPrice || [];
    //   let tokenPriceData: any = {};
    //   fetchedPriceData.map(
    //     (price: any) => (tokenPriceData[price.symbol] = price)
    //   );
    //   setTokenPrice(tokenPriceData);
    // };
    // fetchData();
  }, []);

  return (
    <>
      <TokenPriceContext.Provider value={tokenPrice}>
        <BannerImage
          bannerImageUrl={
            pathname.indexOf("/marketplace/equipment") > -1
              ? "/assets/images/main/banner_equipment_marketplace.jpg"
              : "/assets/images/main/banner.png"
          }
        />
        <BannerFeet>
          <BannerFeetLabel>{TITLES[pathname] || "MARKETPLACE"}</BannerFeetLabel>
        </BannerFeet>
        <Contents>
          <Switch>
            <Route exact={false} path="/marketplace" component={Marketplace} />
            <Route exact={false} path="/inventory" component={Inventory} />
            <Redirect to="/marketplace" />
          </Switch>
        </Contents>
      </TokenPriceContext.Provider>
    </>
  );
};

export default HomePage;
