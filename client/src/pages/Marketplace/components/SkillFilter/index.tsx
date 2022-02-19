import React, { useState, useEffect } from "react";

import { SkillParams } from "../../../../constants";
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

  useEffect(() => {
    setSelectedOptions(filterCondition.skill || []);
  }, [filterCondition]);

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

  const renderOptionItem = (props: any) => {
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

  const renderSuggestionOptions = () => {
    const selectedValues = selectedOptions.map((item) => item?.value);
    let resultElements = [],
      index = 0;
    while (resultElements.length < 5 && index < SkillParams.length) {
      const crrElement = SkillParams[index];
      const isSelected = selectedValues.includes(crrElement.value);
      if (!isSelected)
        resultElements.push(
          <SkillFilterSelectedItem
            key={index}
            onClick={() =>
              handleChangeSelect({
                label: crrElement.name,
                value: crrElement.value,
                customAbbreviation: `${crrElement.image}&&${crrElement.type}`,
              })
            }
          >
            <SelectedItemImage image={crrElement.image} />
            <SelectedItemLabel>
              <div>{crrElement.name}</div>
              <div>{crrElement.type}</div>
            </SelectedItemLabel>
          </SkillFilterSelectedItem>
        );
      index++;
    }
    return resultElements;
  };

  const renderSkillFilter = () => {
    return (
      <>
        <StyledSelect
          value={null}
          formatOptionLabel={renderOptionItem}
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
        <SelectedOptionPanel>
          <SkillFilterItemName>SUGGESTION</SkillFilterItemName>
          {renderSuggestionOptions()}
        </SelectedOptionPanel>
      </>
    );
  };
  return <Accordion header="Skill" body={renderSkillFilter()} />;
};

export default SkillFilter;
