import React, { useState } from "react";

import { Filter, Navbar, GeneralFilter, SkillFilter } from "./components";

import {
  BannerImage,
  BannerFeet,
  BannerFeetLabel,
  Contents,
  ContentsContainer,
  FilterWrapper,
} from "./styled";

function Marketplace() {
  const [filterCondition, setFilterCondition] = useState<any>({
    recruitCounter: { start: 0, end: 7 },
  });

  console.log(filterCondition);
  return (
    <>
      <BannerImage />
      <BannerFeet>
        <BannerFeetLabel>MARKETPLACE</BannerFeetLabel>
      </BannerFeet>
      <Contents>
        <Navbar />
        <ContentsContainer>
          <FilterWrapper>
            <Filter />
            <GeneralFilter
              filterCondition={filterCondition}
              setFilterCondition={setFilterCondition}
            />
            <SkillFilter
              filterCondition={filterCondition}
              setFilterCondition={setFilterCondition}
            />
          </FilterWrapper>
        </ContentsContainer>
      </Contents>
    </>
  );
}

export default Marketplace;
