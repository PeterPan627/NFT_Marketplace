import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { EquipmentDetail, HeroDetail } from "../../components/ItemDetail";

import SubNavbar from "../../components/SubNav";

import { AllHeros, AllEquipments } from "./components";

import { ContentsContainer } from "./styled";

const Marketplace: React.FC = () => {
  return (
    <>
      <SubNavbar
        externalLink={{
          hero: "/marketplace/heros",
          equipment: "/marketplace/equipments",
        }}
      />
      <ContentsContainer>
        <Switch>
          <Route exact strict path="/marketplace/heros" component={AllHeros} />
          <Route
            exact
            strict
            path="/marketplace/equipments"
            component={AllEquipments}
          />
          <Route exact strict path="/marketplace/hero" component={HeroDetail} />
          <Route
            exact
            strict
            path="/marketplace/equipment"
            component={EquipmentDetail}
          />
          <Redirect to="/marketplace/heros" />
        </Switch>
      </ContentsContainer>
    </>
  );
};

export default Marketplace;
