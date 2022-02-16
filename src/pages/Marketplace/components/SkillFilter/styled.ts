import styled from "styled-components";
import Select from "react-select";

export const OptionItemWrapper = styled.div`
  padding: 0.25rem 1rem;
  font-weight: 400;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  background: #141b28;
  cursor: pointer;
  &:hover {
    background: #2e2d2b;
  }
`;

export const OptionItem = styled.div`
  display: flex;
  color: white;
  align-items: center;
`;

export const OptionImage = styled.div<{ image: string }>`
  --image-size: 30px;
  width: var(--image-size);
  margin-top: 5px;
  float: left;
  border-radius: 3px;
  background: ${({ image }) => `url(${image})`};
  background-size: var(--image-size) var(--image-size);
`;

export const OptionLabel = styled.div`
  width: calc(100% - 20px);
  float: right;
  padding-left: 8px;
  div:last-child {
    opacity: 0.9;
    text-transform: capitalize;
    font-weight: 400;
    font-size: 12px;
  }
`;

export const StyledSelect = styled(Select)`
  & > div {
    background: #141b28;
    font-size: 1.4rem;
    color: #fbfbfb;
    padding: 0;
    border: 1px solid rgba(163, 255, 37, 0.2);
  }
  & > div:last-of-type {
    font-size: 1.4rem;
    max-height: 245px;
    text-align: left;
    border-radius: 0.25rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    & > div {
      &::-webkit-scrollbar {
        width: 2px;
      }
      & > div {
        padding: 0;
      }
    }
  }
`;

export const SelectedOptionPanel = styled.div`
  margin: 10px 0;
  border-bottom: 1px solid #555353;
`;

export const SkillFilterItemName = styled.p`
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 1rem;
`;

export const SkillFilterSelectedItem = styled.div`
  font-size: 1.4rem;
  color: #dfd5c7;
  line-height: 1.2;
  position: relative;
  font-weight: 600;
  display: flex;
  margin-top: 0;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const SelectedItemImage = styled.div<{ image: string }>`
  --image-size: 30px;
  background: ${({ image }) => `url(${image})`};
  background-size: var(--image-size) var(--image-size);
  width: var(--image-size);
  height: var(--image-size);
`;

export const SelectedItemLabel = styled.div`
  width: calc(100% - 20px);
  float: right;
  padding-left: 8px;
  padding-top: 3px
  &>div:first-of-type {
    font-size: 1.4rem;
    color: #dfd5c7;
    line-height: 1.2;
    position: relative;
    font-weight: 600;
    display: flex;
  }
  &>div:last-of-type {
    opacity: .9;
    text-transform: capitalize;
    font-weight: 400;
    font-size: 12px;
  }
  button {
    position: absolute;
    right: 0;
    top: 3px;
    filter: invert(1) grayscale(100%) brightness(200%);
    cursor: pointer;
    color: #000;
    opacity: 0.5;
    background: transparent;
    border: none;
    i {
      font-size: 16px;
    }
    &:hover {
      opacity: 0.75;
    }
  }
`;
