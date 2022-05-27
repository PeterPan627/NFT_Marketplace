import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ContentNavbar, ContentNavItem } from "./styled";

function SubNavbar({
  externalLink,
}: {
  externalLink: { hero: string; equipment: string };
}) {
  let history = useHistory();
  const location = useLocation();
  const isHeroList = location.pathname.indexOf(externalLink.hero) > -1;
  const isEquipmentList =
    location.pathname.indexOf(externalLink.equipment) > -1;

  const handleClickNavItem = (url: string) => {
    history.push(url);
  };

  return isHeroList || isEquipmentList ? (
    <ContentNavbar>
      <ContentNavItem
        onClick={() => handleClickNavItem(externalLink.hero)}
        active={isHeroList}
      >
        Hero
      </ContentNavItem>
      <ContentNavItem
        onClick={() => handleClickNavItem(externalLink.equipment)}
        active={isEquipmentList}
      >
        Equipment
      </ContentNavItem>
    </ContentNavbar>
  ) : null;
}

export default SubNavbar;
