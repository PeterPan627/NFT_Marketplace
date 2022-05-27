import styled from 'styled-components';

export const ContentNavbar = styled.div`
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  color: #dfd5c7;
  display: flex;
  padding: 7px 2rem;
  border-radius: 5px;
  font-size: 19px;
  background: #1f2734;
  margin-bottom: 15px;
`

export const ContentNavItem = styled.div<{ active?: boolean }>`
  margin-left: 30px;
  cursor: pointer;
  ${({ active }) => active && `
    padding-bottom: 1px;
    font-weight: 700;
    border-bottom: 4px solid #42b436;
  `}
`