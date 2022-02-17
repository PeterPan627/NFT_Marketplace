import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ContentNavbar, ContentNavItem } from "./styled";

function Navbar() {
  let history = useHistory();
  const location = useLocation();
  const isHeroList = location.pathname.indexOf("heros") > -1;
  const isEquipmentList = location.pathname.indexOf("equipments") > -1;

  const handleClickNavItem = (url: string) => {
    history.push(url);
  };

  return isHeroList || isEquipmentList ? (
    <ContentNavbar>
      <ContentNavItem
        onClick={() => handleClickNavItem("/heros")}
        active={isHeroList}
      >
        Hero
      </ContentNavItem>
      <ContentNavItem
        onClick={() => handleClickNavItem("/equipments")}
        active={isEquipmentList}
      >
        Equipment
      </ContentNavItem>
    </ContentNavbar>
  ) : null;
}

export default Navbar;
