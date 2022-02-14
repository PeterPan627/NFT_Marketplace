import React from "react";

import { ContentNavbar, ContentNavItem } from "./styled";

function Navbar() {
  return (
    <ContentNavbar>
      <ContentNavItem active>Hero</ContentNavItem>
      <ContentNavItem>Equipment</ContentNavItem>
    </ContentNavbar>
  );
}

export default Navbar;
