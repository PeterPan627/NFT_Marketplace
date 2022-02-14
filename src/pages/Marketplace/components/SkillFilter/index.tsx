import React, { useState } from "react";

import { SkillParams } from "../../../../Constants";
import Accordion from "../Accordion";

import {
  OptionItemWrapper,
  OptionItem,
  OptionImage,
  OptionLabel,
  StyledSelect,
  SelectedOptionPanel,
  SkillFilterItemName,
  SkillFilterSelectedItem,
  SelectedItemImage,
  SelectedItemLabel,
} from "./styled";

interface Props {
  filterCondition: any;
  setFilterCondition: any;
}

interface OptionProps {
  label: string;
  value: string;
  customAbbreviation: string;
}

const SkillFilter: React.FC<Props> = ({
  filterCondition,
  setFilterCondition,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionProps[]>([]);

  const handleChangeSelect = (selectedOption: any) => {
    const selectedValues = selectedOptions.map((item) => item?.value);
    const selectedValue = selectedOption.value;
    let newSelectedOptions: OptionProps[] = [];
    if (selectedValues.includes(selectedValue)) {
      selectedOptions.map(
        (item) => item.value !== selectedValue && newSelectedOptions.push(item)
      );
    } else {
      newSelectedOptions = [...selectedOptions];
      newSelectedOptions.push(selectedOption);
    }
    setSelectedOptions(newSelectedOptions);
    setFilterCondition({
      ...filterCondition,
      skill: newSelectedOptions,
    });
  };

  const formatOptionLabel = (props: any) => {
    const { label, customAbbreviation } = props;
    return (
      <OptionItemWrapper>
        <OptionItem>
          <OptionImage image={customAbbreviation.split("&&")[0]} />
          <OptionLabel>
            <div>{label}</div>
            <div>{customAbbreviation.split("&&")[1]}</div>
          </OptionLabel>
        </OptionItem>
      </OptionItemWrapper>
    );
  };

  const renderSkillFilter = () => {
    return (
      <>
        <StyledSelect
          value={null}
          formatOptionLabel={formatOptionLabel}
          options={[...Array(20)].map((item, index) => ({
            label: SkillParams[index].name,
            value: SkillParams[index].value,
            customAbbreviation: `${SkillParams[index].image}&&${SkillParams[index].type}`,
          }))}
          onChange={handleChangeSelect}
        />
        <SelectedOptionPanel>
          <SkillFilterItemName>SELECTED</SkillFilterItemName>
          {selectedOptions.map((selectedItem, selectedIndex) => {
            return (
              <SkillFilterSelectedItem key={selectedIndex}>
                <SelectedItemImage
                  image={selectedItem.customAbbreviation.split("&&")[0]}
                />
                <SelectedItemLabel>
                  <div>{selectedItem.label}</div>
                  <div>{selectedItem.customAbbreviation.split("&&")[1]}</div>
                  <button onClick={() => handleChangeSelect(selectedItem)}>
                    <i className="fa-solid fa-xmark" />
                  </button>
                </SelectedItemLabel>
              </SkillFilterSelectedItem>
            );
          })}
        </SelectedOptionPanel>
      </>
    );
  };
  return <Accordion header="Skill" body={renderSkillFilter()} />;
};

export default SkillFilter;
