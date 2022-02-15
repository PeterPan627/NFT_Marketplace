import React from "react";
import { Wrapper, StyledRange } from "./styled";

interface Props {
  onBeforeChange?: Function;
  onChange?: Function;
  onAfterChange?: Function;
  value?: [number, number] | undefined;
  defaultValue?: [number, number] | undefined;
}

const Slider: React.FC<Props> = (props) => {
  const {
    onBeforeChange = () => {},
    onChange = () => {},
    onAfterChange = () => {},
    value = undefined,
    defaultValue = [0, 100],
  } = props;

  return (
    <Wrapper>
      <StyledRange
        defaultValue={defaultValue}
        value={value}
        onBeforeChange={(e) => onBeforeChange(e)}
        onChange={(e) => onChange(e)}
        onAfterChange={(e) => onAfterChange(e)}
      />
    </Wrapper>
  );
};

export default Slider;
