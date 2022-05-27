import React, { useState, useEffect } from "react";
import Slider from "../../../../components/Slider";

import Accordion from "../Accordion";
import { StatsFilterItem, StatsFilterItemName } from "./styled";

interface Props {
  filterCondition: any;
  setFilterCondition: any;
}

const StatsFilter: React.FC<Props> = ({
  filterCondition,
  setFilterCondition,
}) => {
  const [statsCondition, setStatsCondition] = useState<any>({});

  useEffect(() => {
    setStatsCondition(filterCondition?.stats || {});
  }, [filterCondition]);

  const handleChangeSlider = (value: [number, number], type: string) => {
    let currentCondition = filterCondition.stats || {};
    currentCondition[type] = { start: value[0], end: value[1] };
    setFilterCondition({
      ...filterCondition,
      stats: { ...currentCondition },
    });
    handleOnChangeSlider(value, type);
  };

  const handleOnChangeSlider = (value: [number, number], type: string) => {
    setStatsCondition({
      ...statsCondition,
      [type]: { start: value[0], end: value[1] },
    });
  };

  const renderSlider = (mainField: string) => {
    return (
      <Slider
        value={[
          statsCondition[mainField]?.start || 0,
          statsCondition[mainField]?.end || 100,
        ]}
        onAfterChange={(value: [number, number]) =>
          handleChangeSlider(value, mainField)
        }
        onChange={(value: [number, number]) =>
          handleOnChangeSlider(value, mainField)
        }
      />
    );
  };

  const renderStatsFilter = () => {
    return (
      <>
        <StatsFilterItem>
          <StatsFilterItemName image="/assets/images/stats/icon_strength.png">
            <div />
            <span>Strength</span>
          </StatsFilterItemName>
          {renderSlider("strength")}
        </StatsFilterItem>
        <StatsFilterItem>
          <StatsFilterItemName image="/assets/images/stats/icon_agility.png">
            <div />
            <span>Agility</span>
          </StatsFilterItemName>
          {renderSlider("agility")}
        </StatsFilterItem>
        <StatsFilterItem>
          <StatsFilterItemName image="/assets/images/stats/icon_vitality.png">
            <div />
            <span>Vitality</span>
          </StatsFilterItemName>
          {renderSlider("vitality")}
        </StatsFilterItem>
      </>
    );
  };

  return <Accordion header="Stats" body={renderStatsFilter()} />;
};

export default StatsFilter;
