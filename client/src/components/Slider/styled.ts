import styled from 'styled-components';
import { Range } from "rc-slider";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`

export const StyledRange = styled(Range)`
  width: 96%;
  .rc-slider-rail {
    background: #7b7979;
    height: 2px;
    position: absolute;
    border-radius: 6px;
    width: 100%;
  }
  .rc-slider-track {
    height: 2px;
    background: #dfd5c7;
    position: absolute;
    border-radius: 6px;
  }
  .rc-slider-step {
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
  }
  .rc-slider-handle {
    border: 2px solid #dfd5c7;
    background: #dfd5c7;
    width: 8px;
    height: 8px;
    margin-top: -3px;
    position: absolute;
    cursor: grab;
    border-radius: 50%;
    touch-action: pan-x;
    &:before {
      content: attr(aria-valuenow);
      position: absolute;
      top: 18px;
      left: 0;
      width: 100%;
      font-size: 12px;
      .rc-slider-mark-text {
        position: absolute;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .rc-slider-mark {
    position: absolute;
    top: 18px;
    left: 0;
    width: 100%;
    font-size: 12px;
    .rc-slider-mark-text {
      position: absolute;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      cursor: pointer;
    }
}
`
