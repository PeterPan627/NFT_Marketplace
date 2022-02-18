import styled from 'styled-components';

const fontColor = '#dfd5c7';
const backgroundColor = '#7b7979';

export const GeneralFilterItem = styled.div`
  margin-bottom: 20px;
`

export const GeneralFilterName = styled.div`
  font-weight: 700;
  padding: 10px 0;
  font-size: 1.17rem;
  @media (min-width: 1200px) {
    font-size: 1.75rem;
  }
`

export const GeneralFilterBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
`

export const RecruitCountWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`

export const RecruitCountSlider = styled.div`
  width: 96%;
  position: relative;
  height: 14px;
  padding: 5px 0;
  border-radius: 6px;
  touch-action: none;
`

export const RecruitCountSliderLine = styled.div`
  height: 2px;
  width: 100%;
  background: ${backgroundColor};
  position: absolute;
`

export const RecruitCountSliderLineSelected = styled.div<{ start: number, end: number }>`
  left: ${({ start }) => `${(100 / 7) * start}%`};
  right: auto;
  width: ${({ start, end }) => `${(100 / 7) * (end - start)}%`};
  height: 2px;
  background: ${fontColor};
  border-radius: 6px;
  position: absolute;
`

export const RecruitCountSliderStepWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background: transparent;
`

export const RecruitCountSliderStep = styled.span<{ index: number, active: boolean }>`
  left: ${({ index }) => `${(100 / 7) * index}%`};
  border: 2px solid ${({ active }) => active? fontColor : backgroundColor};
  background: ${({ active }) => active? fontColor : backgroundColor};
  bottom: -1px;
  position: absolute;
  margin-left: -4px;
  width: 8px;
  height: 8px;
  cursor: pointer;
  border-radius: 50%;
  vertical-align: middle;
`

export const RecruitCountSliderMarkWrapper = styled.div`
  position: absolute;
  top: 18px;
  left: 0;
  width: 100%;
  font-size: 12px;
`

export const RecruitCountSliderMark = styled.span<{ index: number, active: boolean }>`
  left: ${({ index }) => `${(100 / 7) * index}%`};
  transform: translateX(-50%);
  position: absolute;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  color: ${({ active }) => active? fontColor : '#999'};
`

export const GeneralCheckBoxItem = styled.div`
  min-height: 2.5rem;
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  padding-left: 1.5rem;
  padding-right: calc(1.5rem * 0.5);
  width: 50%;
  max-width: 100%;
  cursor: pointer;
`

export const StyledCheckBox = styled.input`
  cursor: pointer;
  background: transparent;
  border: 1px solid ${fontColor};
  border-radius: 2px;
  transition: all 0.2s ease-in;
  float: left;
  margin-left: -1.5rem;
  width: 1em;
  height: 1em;
  /* appearance:none; */
  color-adjust: exact;
  &:checked {
    background-color: ${fontColor};
  }
`

export const CheckBoxLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
`

export const CheckBoxImage = styled.div<{ url?: string }>`
  --size: 40px;
  width: var(--size);
  height: var(--size);
  background: ${({ url }) => `url(${url})`};
  background-size: var(--size) var(--size);
`