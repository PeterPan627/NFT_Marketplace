import styled from 'styled-components';
import { backgroundColor, fontColor } from '../styled';

export const AccordionWrapper = styled.div`
  width: 100%;
`

export const AccordionHeader = styled.div<{ expanded: boolean }>`
  color: ${fontColor};
  background: ${backgroundColor};
  cursor: pointer;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  ${({ expanded }) => !expanded && `
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  `}

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
  font-size: 1.8rem;
  border: 0 solid transparent;
  padding: 1rem 1.75rem;
  i {
    color: #a3ff26;
    transition: transform 0.2s ease-in-out;
    transform: ${({ expanded }) => `rotate(${expanded? '0deg' : '180deg'})`};
  }
`

export const AccordionBody = styled.div<{ expanded: boolean }>`
  background: ${backgroundColor};
  color: ${fontColor};
  ${({ expanded }) => expanded ? `
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    padding: 1rem 1.75rem;
  ` : `
    height: 0;
    padding: 0;
  `}
  transition: height 0.2s ease-in-out;
  overflow: hidden;
`