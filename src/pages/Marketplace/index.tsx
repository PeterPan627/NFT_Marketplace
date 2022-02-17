import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

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
            <Route exact strict path="/heros" component={AllHeros} />
            <Route exact strict path="/equipments" component={AllEquipments} />
            <Route exact strict path="/hero" component={HeroDetail} />
            <Route exact strict path="/equipment" component={EquipmentDetail} />
            <Redirect to="/heros" />
          </Switch>
        </ContentsContainer>
      </Contents>
    </>
  );
};

export default Marketplace;
