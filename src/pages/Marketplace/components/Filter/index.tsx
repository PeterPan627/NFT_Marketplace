import React from "react";

import { FilterInfo, FilterInfoLabel, ClearFilterButton } from "./styled";

function Filter() {
  return (
    <>
      <FilterInfo>
        <FilterInfoLabel>Filter (0)</FilterInfoLabel>
        <ClearFilterButton disabled>Clear filter</ClearFilterButton>
      </FilterInfo>
    </>
  );
}

export default Filter;
