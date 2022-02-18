import React from "react";

import { RacesParams, RarityParams, GenderParams } from "../../../../Constants";
import Accordion from "../Accordion";

import {
  GeneralFilterItem,
  GeneralFilterName,
  GeneralFilterBody,
  RecruitCountWrapper,
  RecruitCountSlider,
  RecruitCountSliderLine,
  RecruitCountSliderLineSelected,
  RecruitCountSliderStepWrapper,
  RecruitCountSliderStep,
  RecruitCountSliderMarkWrapper,
  RecruitCountSliderMark,
  GeneralCheckBoxItem,
  StyledCheckBox,
  CheckBoxLabel,
  CheckBoxImage,
} from "./styled";

interface Props {
  isEquipment?: boolean;
  filterCondition: any;
  setFilterCondition: any;
}

const GeneralFilter: React.FC<Props> = ({
  isEquipment = false,
  filterCondition,
  setFilterCondition,
}) => {
  const handleClickCheckBox = (e: any, mainField: string, subField: string) => {
    const checked = e.target.checked;
    let crrCondition = filterCondition[mainField] || {};
    crrCondition[subField] = checked;
    setFilterCondition({
      ...filterCondition,
      [mainField]: crrCondition,
    });
  };

  const handleClickSlider = (index: number) => {
    let newStart = filterCondition.recruitCounter?.start || 0;
    let newEnd = filterCondition.recruitCounter?.end || 7;
    if (index === newStart || index === newEnd) return;
    if (index < newStart) newStart = index;
    if (index > newEnd) newEnd = index;
    if (index > newStart && index < newEnd) {
      const diffFromStart = index - newStart;
      const diffFromEnd = newEnd - index;
      if (diffFromEnd > diffFromStart) {
        newStart = index;
      } else {
        newEnd = index;
      }
    }
    setFilterCondition({
      ...filterCondition,
      recruitCounter: { start: newStart, end: newEnd },
    });
  };

  const renderCheckboxItem = (item: any, index: number, mainField: string) => {
    const crrCondition = filterCondition[mainField] || {};
    return (
      <GeneralCheckBoxItem key={index}>
        <StyledCheckBox
          type="checkbox"
          checked={crrCondition[item.key]}
          onClick={(e) => handleClickCheckBox(e, mainField, item.key)}
        />
        <CheckBoxLabel style={item.image ? {} : { paddingLeft: "1.5rem" }}>
          {item.image && <CheckBoxImage url={item.image} />}
          {item.name}
        </CheckBoxLabel>
      </GeneralCheckBoxItem>
    );
  };

  const conditionStart = filterCondition.recruitCounter?.start || 0;
  const conditionEnd = filterCondition.recruitCounter?.end || 7;

  const renderGeneralFilter = () => {
    return (
      <>
        <GeneralFilterItem key="races">
          <GeneralFilterName>Races</GeneralFilterName>
          <GeneralFilterBody>
            {RacesParams.map((raceItem, raceIndex) => {
              return renderCheckboxItem(raceItem, raceIndex, "races");
            })}
          </GeneralFilterBody>
        </GeneralFilterItem>
        {!isEquipment && (
          <GeneralFilterItem key="recruit">
            <GeneralFilterName>Recruit Count</GeneralFilterName>
            <GeneralFilterBody>
              <RecruitCountWrapper>
                <RecruitCountSlider>
                  <RecruitCountSliderLine />
                  <RecruitCountSliderLineSelected
                    start={conditionStart}
                    end={conditionEnd}
                  />
                  <RecruitCountSliderStepWrapper>
                    {[...Array(8)].map((item, index) => {
                      const active =
                        index >= conditionStart && index <= conditionEnd;
                      return (
                        <RecruitCountSliderStep
                          key={index}
                          index={index}
                          active={active}
                          onClick={() => handleClickSlider(index)}
                        />
                      );
                    })}
                  </RecruitCountSliderStepWrapper>
                  <RecruitCountSliderMarkWrapper>
                    {[...Array(8)].map((item, index) => {
                      const active =
                        index >= conditionStart && index <= conditionEnd;
                      return (
                        <RecruitCountSliderMark
                          key={index}
                          index={index}
                          active={active}
                        >
                          {index}
                        </RecruitCountSliderMark>
                      );
                    })}
                  </RecruitCountSliderMarkWrapper>
                </RecruitCountSlider>
              </RecruitCountWrapper>
            </GeneralFilterBody>
          </GeneralFilterItem>
        )}
        <GeneralFilterItem key="rarity">
          <GeneralFilterName>Rarity</GeneralFilterName>
          <GeneralFilterBody>
            {RarityParams.map((rarityItem, rarityIndex) => {
              return renderCheckboxItem(rarityItem, rarityIndex, "rarity");
            })}
          </GeneralFilterBody>
        </GeneralFilterItem>
        {!isEquipment && (
          <GeneralFilterItem key="gender">
            <GeneralFilterName>Gender</GeneralFilterName>
            <GeneralFilterBody>
              {GenderParams.map((genderItem, genderIndex) => {
                return renderCheckboxItem(genderItem, genderIndex, "gender");
              })}
            </GeneralFilterBody>
          </GeneralFilterItem>
        )}
      </>
    );
  };

  return <Accordion header="General" body={renderGeneralFilter()} />;
};

export default GeneralFilter;
