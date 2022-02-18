import React, { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";
import { GraphQueryUrls } from "../../Constants";
import { sendRequestByGraphQl } from "../../utils/fetch";
import Marketplace from "../Marketplace";

import { BannerImage, BannerFeet, BannerFeetLabel, Contents } from "./styled";

export const TokenPriceContext = createContext<{ [key: string]: any }>({});

const TITLES: { [key: string]: string } = {
  "/heros": "MARKETPLACE",
  "/equipments": "MARKETPLACE",
  "/hero": "HERO DETAIL",
  "/equipment": "EQUIPMENT DETAIL",
};

const HomePage: React.FC = () => {
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
          <Marketplace />
        </Contents>
      </TokenPriceContext.Provider>
    </>
  );
};

export default HomePage;
