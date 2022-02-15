import React from "react";

import { FilterInfo, FilterInfoLabel, ClearFilterButton } from "./styled";

const Filter: React.FC<{ filterCondition: any; setFilterCondition: any }> = ({
  filterCondition,
  setFilterCondition,
}) => {
  const getFilterCounts = () => {
    const defineConditionExistence = (
      condition: any,
      min: number,
      max: number
    ) => {
      // define if condition with type {start: number, end: number} is exist
      const start = condition?.start || min;
      const end = condition?.end || max;
      return start > min || end < max;
    };

    // initiate return value to the length of condition of skill
    let result = filterCondition.skill?.length || 0;

    // define if conditions of gender, races, rarity are exist
    const booleanConditions = {
      ...filterCondition.gender,
      ...filterCondition.races,
      ...filterCondition.rarity,
    };
    Object.keys(booleanConditions).map(
      (key: string) => booleanConditions[key] && result++
    );

    // define if conditions of recruit counter, stats are exists
    if (defineConditionExistence(filterCondition.recruitCounter, 0, 7))
      result++;
    if (defineConditionExistence(filterCondition.stats?.strength, 0, 100))
      result++;
    if (defineConditionExistence(filterCondition.stats?.agility, 0, 100))
      result++;
    if (defineConditionExistence(filterCondition.stats?.vitality, 0, 100))
      result++;

    return result;
  };

  return (
    <>
      <FilterInfo>
        <FilterInfoLabel>{`Filter (${getFilterCounts()})`}</FilterInfoLabel>
        <ClearFilterButton
          disabled={getFilterCounts() === 0}
          onClick={() =>
            setFilterCondition({
              recruitCounter: { start: 0, end: 7 },
            })
          }
        >
          Clear filter
        </ClearFilterButton>
      </FilterInfo>
    </>
  );
};

export default Filter;
