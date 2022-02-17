import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Navbar } from "./components";
import { AllHeros, HeroDetail } from "./components";

import {
  BannerImage,
  BannerFeet,
  BannerFeetLabel,
  Contents,
  ContentsContainer,
} from "./styled";

const Marketplace: React.FC = () => {
  return (
    <>
      <BannerImage />
      <BannerFeet>
        <BannerFeetLabel>MARKETPLACE</BannerFeetLabel>
      </BannerFeet>
      <Contents>
        <Navbar />
        <ContentsContainer>
          <Switch>
            <Route exact strict path="/" component={AllHeros} />
            <Route exact strict path="/hero" component={HeroDetail} />
            <Redirect to="/" />
          </Switch>
        </ContentsContainer>
      </Contents>
    </>
  );
};

export default Marketplace;
