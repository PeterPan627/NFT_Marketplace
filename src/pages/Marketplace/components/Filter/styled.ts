import styled from 'styled-components';
import { backgroundColor, fontColor } from '../styled';

export const FilterInfo = styled.div`
  color: ${fontColor};
  background: ${backgroundColor};
  padding: 1rem 1.75rem;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const FilterInfoLabel = styled.span`
  font-size: 1.6rem;
`

export const ClearFilterButton = styled.button`
  padding: 5px 20px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-image-slice: 5 5 5 5 fill;
  border-image-width: 5px 5px 5px 5px;
  border-image-outset: 0 0 0 0;
  border-image-repeat: stretch stretch;
  transition: all .1s ease-in;
  -webkit-appearance: button;
  color: #fff;
  background-color: unset;
  border-image-source: url('/assets/images/main/btn-green.png');
  cursor: pointer;
  }
  &:disabled {
    border-image-source: url('/assets/images/main/btn-grey.png');
    pointer-events: none;
    opacity: 0.65;
  }
`