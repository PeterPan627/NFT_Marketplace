import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Navbar } from "./components";
import {
  AllHeros,
  AllEquipments,
  HeroDetail,
  EquipmentDetail,
} from "./components";

import { ContentsContainer } from "./styled";

const Marketplace: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default Marketplace;
